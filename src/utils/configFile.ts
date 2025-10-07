import laravel from "../assets/conf/laravel.txt?raw"
import react from "../assets/conf/react.txt?raw"
import astro from "../assets/conf/astro.txt?raw"


export function makeConfigFile(config: {url: string, indexPath: string, accessLog: string, errorLog: string, FPMVersion: string, cacheDuration: string, gzip: string , reversePort: string , cacheUnit: string}, techno: string) {
    if (techno === "Laravel") {
        return laravel.
        replace(":{url}:", config.url).
        replace(":{indexPath}:", config.indexPath).
        replace(":{accesslog}:", config.accessLog).
        replace(":{errorlog}:", config.errorLog).
        replace(":{FPMVersion}:", config.FPMVersion).
        replace(":{cacheduration}:", config.cacheDuration + config.cacheUnit).
        replace(":{gzip}:", config.gzip);
    }else if (techno === "React") {
        let reactData = react;
        if (config.reversePort === "") {
            reactData = reactData.replace(/:\/:reverse:\/:[\s\S]*?:\/:reverse:\/:/g, "");
        }
        return reactData.
        replace(":{url}:", config.url).
        replace(":{indexPath}:", config.indexPath).
        replace(":{accesslog}:", config.accessLog).
        replace(":{errorlog}:", config.errorLog).
        replace(":{cacheduration}:", config.cacheDuration + config.cacheUnit).
        replace(":{gzip}:", config.gzip).
        replace(":{reverse_port}:", config.reversePort);
    }else if (techno === "Astro") {
        return astro.
        replace(":{url}:", config.url).
        replace(":{indexPath}:", config.indexPath).
        replace(":{accesslog}:", config.accessLog).
        replace(":{errorlog}:", config.errorLog).
        replace(":{cacheduration}:", config.cacheDuration + config.cacheUnit);
    }
}

export function downloadConfigFile(data: string,config: {url: string}) {
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = config.url + ".conf";
    a.click();
}

export function configFileHandler(config: {url: string, indexPath: string, accessLog: string, errorLog: string, FPMVersion: string, cacheDuration: string, gzip: string , reversePort: string , cacheUnit: string}, techno: string) {
    const data = makeConfigFile(config, techno);

    if (data) {
        downloadConfigFile(data, config);
    }
    else {
        alert("Erreur lors de la génération du fichier de configuration");
    }
}