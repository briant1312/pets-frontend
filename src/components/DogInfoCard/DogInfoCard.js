export default function DogInfoCard({dog}){
    return (
        <div>
            {dog && 
                <>
                    <h1>{dog.name}</h1>
                    <img src={dog.image.url} alt="dog"/>
                    <p>temperament: {dog.temperament}</p>
                    <p>life span: {dog.life_span}</p>
                    <p>origin: {dog.origin || "unknown"}</p>
                    <p>bred for: {dog.bred_for || "unknown"}</p>
                    <p>weight: {dog.weight.imperial} pounds</p>
                    <p>height at shoulders: {dog.height.imperial} inches</p>
                </>
            }
        </div>
    )
}
