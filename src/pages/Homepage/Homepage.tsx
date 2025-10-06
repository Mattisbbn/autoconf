import { useState } from "react"
import BaseLayout from "../../Layouts/BaseLayout"
import TechnoCard from "../../components/TechnoCard"
import { Icon } from "@iconify/react"


export default function Homepage() {
  const [selectedTechno, setSelectedTechno] = useState<string>("")

  return (
    <BaseLayout>
      <section className="flex flex-col items-center justify-center xl:w-1/2 md:w-3/4  mx-auto">
        <h1 className=" md:text-5xl font-semibold text-white">Configuration Nginx sans effort</h1>
        <h2 className="text-lg font-medium text-center text-gray-500 mt-2">Sélectionnez votre technologie et entrez l'URL de votre site web pour générer une configuration Nginx.</h2>
      

        <div className="flex flex-row gap-4 mt-12">
            <TechnoCard icon="devicon:laravel" title="Laravel" onClick={() => setSelectedTechno("Laravel")} selectedTechno={selectedTechno} />
            <TechnoCard icon="devicon:react" title="React" onClick={() => setSelectedTechno("React")} selectedTechno={selectedTechno} />
            <TechnoCard icon="devicon:astro" title="Astro" onClick={() => setSelectedTechno("Astro")} selectedTechno={selectedTechno} />
        </div>

        <div className="flex gap-4 mt-12 w-full">
            <div className="relative flex w-5/7 ">
                <Icon icon="iconamoon:link-bold" className="absolute left-4 top-1/2 w-6 h-6 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="URL du site web" className="w-full ps-12 p-4 rounded-lg bg-gray-700/50 text-white h-12" />
            </div>
         

                <button className="bg-azure-radiance-600 hover:bg-azure-radiance-700 cursor-pointer w-2/7 text-white px-4 py-2 rounded-lg h-12 flex items-center justify-center gap-2 ">Générer <Icon icon="iconamoon:arrow-right-1-light" className="w-6 h-6  text-white " /></button>

            
        </div>

       
       

      
      
      
      
      </section>
    </BaseLayout>
  )
}