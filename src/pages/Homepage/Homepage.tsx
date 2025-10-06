import { useState } from "react"
import BaseLayout from "../../Layouts/BaseLayout"
import TechnoCard from "../../components/TechnoCard"
import { Icon } from "@iconify/react"   
import { configFileHandler } from "../../utils/configFile"
import InputText from "../../components/InputText"
import { toast } from "react-toastify"




export default function Homepage() {
  const [selectedTechno, setSelectedTechno] = useState<string | null>(null)
  const [config, setConfig] = useState<{url: string, indexPath: string, FPMVersion: string, cacheDuration: string, cacheUnit: string, gzip: string, accessLog: string, errorLog: string, reversePort: string}>({
    url: "",
    indexPath: "",
    FPMVersion: "",
    cacheDuration: "0",
    cacheUnit: "h",
    gzip: "off",
    accessLog: "",
    errorLog: "",
    reversePort: "",
  })

  const [popup, setPopup] = useState<boolean>(false)

  return (
    <BaseLayout>
      <section className="flex flex-col items-center justify-center xl:w-1/2 md:w-3/4  mx-auto py-12">
        <h1 className=" md:text-5xl font-semibold text-white">Configuration Nginx sans effort</h1>
        <h2 className="text-lg font-medium text-center text-gray-500 mt-2">Sélectionnez votre technologie et entrez l'URL de votre site web pour générer une configuration Nginx.</h2>
      
        <div className="flex flex-row gap-4 mt-12">
            <TechnoCard icon="devicon:laravel" title="Laravel" onClick={() => setSelectedTechno("Laravel")} selectedTechno={selectedTechno} />
            <TechnoCard icon="devicon:react" title="React" onClick={() => setSelectedTechno("React")} selectedTechno={selectedTechno} />
            <TechnoCard icon="devicon:astro" title="Astro" onClick={() => setSelectedTechno("Astro")} selectedTechno={selectedTechno} />
        </div>

     

      
        {selectedTechno && (<>
            <InputText label="URL du site web" icon="iconamoon:link-bold" value={config.url} onChange={(e) => (
                setConfig({...config, url: e.target.value , accessLog: "/var/log/nginx/" + e.target.value + ".access.log", errorLog: "/var/log/nginx/" + e.target.value + ".error.log"})
            )} placeholder="https://nomdusite.fr" />
            <InputText label="Chemin de l'index" icon="iconamoon:folder-bold" value={config.indexPath} onChange={(e) => setConfig({...config, indexPath: e.target.value})} placeholder="/var/www/html/nomdusite/build/" />

            {
                selectedTechno === "Laravel" && (
                    <InputText label="Version PHP-FPM" icon="devicon-plain:php" value={config.FPMVersion} onChange={(e) => setConfig({...config, FPMVersion: e.target.value})} placeholder="8.4" />
                )
            }
           
            <InputText label="Chemin des logs d'accès" icon="iconamoon:file-document-bold" value={config.accessLog} onChange={(e) => setConfig({...config, accessLog: e.target.value})} placeholder="/var/log/nginx/nomdusite.fr.access.log" />
            <InputText label="Chemin des logs d'erreur" icon="iconamoon:file-document-bold" value={config.errorLog} onChange={(e) => setConfig({...config, errorLog: e.target.value})} placeholder="/var/log/nginx/nomdusite.fr.error.log" />

    
            <div className="flex flex-col w-full mt-2">
                <label htmlFor="index-path" className="text-gray-500">Durée de cache </label>
                <div className="relative flex flex-col w-full ">
                    <Icon icon="iconamoon:clock-bold" className="absolute left-4 top-1/2 w-6 h-6 -translate-y-1/2 text-gray-500" />
                    <div className="flex flex-row ">
                        <input value={config.cacheDuration} onChange={(e) => setConfig({...config, cacheDuration: e.target.value})} type="text" placeholder="0" className="w-full ps-12 p-4 rounded-l-lg bg-gray-700/50 text-white h-12" />
                        <select value={config.cacheUnit} onChange={(e) => setConfig({...config, cacheUnit: e.target.value})} name="cache-unit" className="  p-4 rounded-r-lg bg-gray-700/50 text-white h-12 border-l-2 border-gray-700/50 ">
                            <option  value="h">Heures</option>
                            <option value="d">Jours</option>
                            <option value="m">Mois</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full mt-2">
                <label htmlFor="index-path" className="text-gray-500">compression Gzip </label>
                <div className="relative flex flex-col w-full ">
                    <Icon icon="fa7-solid:compress-alt" className="absolute left-4 top-1/2 w-6 h-6 -translate-y-1/2 text-gray-500" />
                  
                       
                        <select value={config.gzip} onChange={(e) => setConfig({...config, gzip: e.target.value})} name="gzip" className="w-full ps-12  p-4 rounded-lg bg-gray-700/50 text-white h-12 border-l-2 border-gray-700/50 ">
                            <option value="on">Oui</option>
                            <option value="off">Non</option>
                        </select>
                </div>
            </div>

            {
                selectedTechno === "React" && (
                    <InputText label="Port du reverse proxy" icon="iconamoon:cloud-bold" value={config.reversePort} onChange={(e) => setConfig({...config, reversePort: e.target.value})} placeholder="3000 (Ne rien mettre si vous n'avez pas de serveur local)" />
                )
            }

            <button onClick={() => (
                configFileHandler(config, selectedTechno),
                setPopup(true)

            )} className="bg-azure-radiance-600 hover:bg-azure-radiance-700 cursor-pointer w-full mt-8 text-white px-4 py-2 rounded-lg h-12 flex items-center justify-center gap-2 ">Générer <Icon icon="iconamoon:arrow-right-1-light" className="w-6 h-6  text-white " /></button>

            </>)}
      </section>

    {popup && (
        <div className="fixed inset-0 bg-white/40 flex items-center justify-center text-white ">
            <div className="bg-blue-charcoal-950 p-4 rounded-lg relative">
            <button onClick={() => setPopup(false)} className=" absolute right-3 top-3 cursor-pointer">
                    <Icon icon="iconamoon:close-bold" className="w-7 h-7  text-white " />
            </button>
                <h3 className="text-2xl mb-4">Configuration générée avec succès</h3>
               

                <h4 className="text-lg mb-2">Aide :</h4>

                <p className="mt-4 mb-2">Lien symbolique: </p>
                <code className="text-sm bg-gray-700/50 p-2 rounded-lg relative pe-10 cursor-pointer" onClick={() => (
                    navigator.clipboard.writeText("sudo apt install certbot python3-certbot-nginx -y"),
                    toast.success("Code copié dans le presse-papiers",{
                      icon: <Icon icon="lets-icons:check-fill" className="w-6 h-6  text-white " />
                    })
                )}>
                    sudo ln -s /etc/nginx/sites-available/{config.url}.conf /etc/nginx/sites-enabled/
                    <Icon icon="iconamoon:copy-bold" className="w-5 h-5  text-white absolute right-2 top-1/2 -translate-y-1/2 " />
                </code>




                <p className="mt-4 mb-2">Installer certbot: </p>
                <code className="text-sm bg-gray-700/50 p-2 rounded-lg relative pe-10 cursor-pointer" onClick={() => (
                    navigator.clipboard.writeText("sudo apt install certbot python3-certbot-nginx -y"),
                    toast.success("Code copié dans le presse-papiers",{
                      icon: <Icon icon="lets-icons:check-fill" className="w-6 h-6  text-white " />
                    })
                )}>
                    sudo apt install certbot python3-certbot-nginx -y
                    <Icon icon="iconamoon:copy-bold" className="w-5 h-5  text-white absolute right-2 top-1/2 -translate-y-1/2 " />
                </code>
                <p className="mt-4 mb-2">Installer le certificat: </p>
                <code className="text-sm bg-gray-700/50 p-2 rounded-lg relative pe-10 cursor-pointer" onClick={() => (
                    navigator.clipboard.writeText("sudo certbot --nginx -d " + config.url),
                    toast.success("Code copié dans le presse-papiers",{
                      icon: <Icon icon="lets-icons:check-fill" className="w-6 h-6  text-white " />
                    })
                )}>
                    sudo certbot --nginx -d {config.url}
                    <Icon icon="iconamoon:copy-bold" className="w-5 h-5  text-white absolute right-2 top-1/2 -translate-y-1/2 " />
                </code>
            </div>
        </div>
    )}


    </BaseLayout>
  )
}