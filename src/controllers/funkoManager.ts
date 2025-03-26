import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { Funko } from "../models/funko.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Clase Manager, que se encarga de manegar los funkos
 */
export class FunkoManager {
  private userDir: string;

  /**
   * Constructor de la clase FunkoManager, comprueba si existe un directorio para el usuario, si no, crea uno
   * @param username Nombre del usuario a buscar
   */
  constructor(private username: string) {
    this.userDir = path.join(__dirname, "..", "data", this.username);
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
  }
  /**
   * Función que obtiene un funko a través de su id
   * @param id asociada al funko
   * @returns El camino lógico a ese funko
   */
  private getFunkoPath(id: number): string {
    return path.join(this.userDir, `${id}.json`);
  }

  /**
   * Escribe en el fichero json el objeto funko que se le pasa por argumento
   * @param funko Funko pasado por argumento
   * @returns Nada, en caso negativo de que el id esté ocupado
   */
  public addFunko(funko: Funko): void {
    const funkoPath = this.getFunkoPath(funko.id);
    if (fs.existsSync(funkoPath)) {
      console.log(chalk.red("Error: Ya existe un Funko con este ID."));
      return;
    }
    fs.writeFileSync(funkoPath, JSON.stringify(funko, null, 2));
    console.log(chalk.green("Funko añadido correctamente."));
  }

  /**
   * Se construye un nuevo objeto funko, que sustituye a uno de la misma id
   * @param updatedFunko Funko que reemplazará al viejo
   * @returns Nada en caso de que no se encuentre el funko a modificar
   */
  public updateFunko(updatedFunko: Funko): void {
    const filePath = path.join(this.userDir, `${updatedFunko.id}.json`);

    if (!fs.existsSync(filePath)) {
      console.log("Error: No se encontró el Funko.");
      return;
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedFunko, null, 2));
    console.log("Funko actualizado correctamente.");
  }
  /**
   * Borra el funko que se localiza en la id pasada como argumento
   * @param id Del funko a eliminar
   * @returns Nada, en caso de que la id a buscar no esté ligada a un funko
   */
  public removeFunko(id: number): void {
    const funkoPath = this.getFunkoPath(id);
    if (!fs.existsSync(funkoPath)) {
      console.log(chalk.red("Error: No se encontró el Funko."));
      return;
    }
    fs.unlinkSync(funkoPath);
    console.log(chalk.green("Funko eliminado correctamente."));
  }
  /**
   * Muestra por pantalla los funkos almacenados de un usuario
   * @returns Nada en caso de que no tenga Funkos ese usuario
   */
  public listFunkos(): void {
    const files = fs.readdirSync(this.userDir);
    if (files.length === 0) {
      console.log(chalk.yellow("No hay Funkos en la lista."));
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(this.userDir, file);
      const funko: Funko = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      this.displayFunko(funko);
    });
  }
  /**
   * Muestra los datos de un funko por pantalla
   * @param id Del funko que vamos a mostrar
   * @returns Nada, en caso de que la id no corresponda con ningún Funko existente en el usuario
   */
  public showFunko(id: number): void {
    const funkoPath = this.getFunkoPath(id);
    if (!fs.existsSync(funkoPath)) {
      console.log(chalk.red("Error: No se encontró el Funko."));
      return;
    }
    const funko: Funko = JSON.parse(fs.readFileSync(funkoPath, "utf-8"));
    this.displayFunko(funko);
  }
  /**
   * Muestra todos los datos usando chalk para estilo
   * @param funko Funko al que se le mostraran los atributos por pantalla
   */
  private displayFunko(funko: Funko): void {
    let color = chalk.white;
    if (funko.marketValue < 20) color = chalk.red;
    else if (funko.marketValue < 50) color = chalk.yellow;
    else if (funko.marketValue < 100) color = chalk.blue;
    else color = chalk.green;

    console.log(
      chalk.bold(`🔹 ${funko.name} (${funko.franchise}) - ${funko.type}`)
    );
    console.log(`  ID: ${funko.id}`);
    console.log(`  Descripción: ${funko.description}`);
    console.log(`  Género: ${funko.genre}`);
    console.log(`  Número: ${funko.number}`);
    console.log(`  Exclusivo: ${funko.exclusive ? "Sí" : "No"}`);
    console.log(`  Características: ${funko.specialFeatures}`);
    console.log(`  Valor de mercado: ` + color(`$${funko.marketValue}`));
    console.log("\n");
  }
}


