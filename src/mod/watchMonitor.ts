
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";


const Options = {
    DirWatch: { type: 'string' as const, demandOption: true },
    DirCopy: { type: 'string' as const, demandOption: true },
};

function commit(datos, fichero_guardar, tiempo_fichero_modificado, fichero_mod) {
  let direction_nuevo: string = fichero_guardar + `_` + fichero_mod;
  if (!fs.existsSync(direction_nuevo)) {
    fs.mkdirSync(direction_nuevo, {recursive: true});
  }
  let direction_final = direction_nuevo + tiempo_fichero_modificado + `.bok`;
  console.log("Se guardará en el fichero:", direction_final);
  fs.writeFile(direction_final, datos, () => {
    console.log("Fichero de versiones nuevas creadas");
  });
}

function watchMonitor(argv) {
  if (!fs.existsSync(argv.DirWatch)) {
    fs.mkdirSync(argv.DirWatch);  
  }
  fs.watchFile(argv.DirWatch, (current_version) => {
    console.log(`Han habido cambios en ${argv.DirWatch}`);
    console.log(`Se escribirá en ${argv.DirCopy}`);
    fs.readFile(argv.DirWatch, (err, data) => {
      if (err) {
        console.log("No se puede obtener los datos del fichero para el commit");
      }
      console.log("Vamos a hacer commit de los datos.");
    commit(data, argv.DirCopy, current_version.mtime, argv.DirWatch);
    });
    
  });
}

yargs(hideBin(process.argv))
  .command("watch", "Observar el directorio", Options, (argv) => {
    watchMonitor(argv);
  })
  .help()
  .parse();




