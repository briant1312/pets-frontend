import './DogInfoCard.scss'

export default function DogInfoCard({dog}){
    return (
        <div className='dog-info-card'>
            {dog && 
                <>
                    <h1>{dog.name}</h1>

                    <div className='right-side'>
                        {dog.image?.url && <img src={dog.image.url} alt="dog"/>}
                        <p>temperament: {dog.temperament}</p>
                        <p>life span: {dog.life_span}</p>
                        <p>origin: {dog.origin || "unknown"}</p>
                        <p>bred for: {dog.bred_for || "unknown"}</p>
                        {dog.weight?.imperial && <p>weight: {dog.weight.imperial} pounds</p>}
                        {dog.height?.imperial && <p>height at shoulders: {dog.height.imperial} inches</p>}
                    </div>
                </>
            }
        </div>
    )
}
