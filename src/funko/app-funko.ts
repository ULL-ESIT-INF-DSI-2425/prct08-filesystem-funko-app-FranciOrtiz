import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoManager } from "./controllers/funkoManager.js";
import { Funko, FunkoType, FunkoGenre } from "./models/funko.js";
/**
 * Interfaz de los argumentos para la consola, id y username son obligatorios
 */
interface FunkoArgs {
  username: string;
  id: number;
  name?: string;
  description?: string;
  type?: FunkoType;
  genre?: FunkoGenre;
  franchise?: string;
  number?: number;
  exclusive?: boolean;
  specialFeatures?: string;
  marketValue?: number;
}
/**
 * Argumentos y las opciones de estos, para que sean escritos por consola
 */
const funkoOptions = {
  username: { type: 'string' as const, demandOption: true },
  id: { type: 'number' as const, demandOption: true },
  name: { type: 'string' as const, demandOption: true },
  description: { type: 'string' as const, demandOption: true },
  type: { 
    type: 'string' as const, 
    choices: Object.values(FunkoType), 
    demandOption: true 
  },
  genre: { 
    type: 'string' as const, 
    choices: Object.values(FunkoGenre), 
    demandOption: true 
  },
  franchise: { type: 'string' as const, demandOption: true },
  number: { type: 'number' as const, demandOption: true },
  exclusive: { type: 'boolean' as const, demandOption: true },
  specialFeatures: { type: 'string' as const, demandOption: false },
  marketValue: { type: 'number' as const, demandOption: true }
};
/**
 * Función template, que interpreta los argumentos como le pases T, y te transforma los argumentos a un objeto de tipo T
 * @param args Lista de argumentos a transformar
 * @returns Los argumentos como un objeto de lo que tu le pases la T
 */
function parseArgs<T>(args: unknown): T {
  return args as T;
}

/**
 * Distintos comportamientos de la consola en función del argumento decidido, después de node y dirección del archivo a ejecutar
 */
yargs(hideBin(process.argv))
  .command("add", "Añadir un Funko", funkoOptions, (argv) => {
    const args = parseArgs<FunkoArgs>(argv);
    const manager = new FunkoManager(args.username);
    manager.addFunko(args as Funko);
  })
  .command("list", "Listar Funkos", {
  }, (argv) => {
    const args = parseArgs<{username: string}>(argv);
    const manager = new FunkoManager(args.username);
    manager.listFunkos();
  })
  .command("update", "Actualizar un Funko", funkoOptions, (argv) => {
    const args = parseArgs<FunkoArgs>(argv);
    const manager = new FunkoManager(args.username);
    manager.updateFunko(args as Funko);
  })
  .command("remove", "Eliminar un Funko", {
  }, (argv) => {
    const args = parseArgs<{username: string, id: number}>(argv);
    const manager = new FunkoManager(args.username);
    manager.removeFunko(args.id);
  })
  .command("read", "Mostrar un Funko", {
  }, (argv) => {
    const args = parseArgs<{username: string, id: number}>(argv);
    const manager = new FunkoManager(args.username);
    manager.showFunko(args.id);
  })
  .help()
  .parse();