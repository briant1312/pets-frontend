import './CatInfoCard.scss'
import { useParams } from 'react-router-dom'

const cats = require("../../data/cats.json")

export default function CatInfoCard(){
    const { catId } = useParams()
    const cat = cats.find((cat) => cat.name === catId)

    return (
        <div className='cat-info-card'>
            {cat && 
                <>
                    <h1>{cat.name}</h1>

                    <div className='right-side'>
                        {cat.image?.url && <img src={cat.image.url} alt="cat"/>}
                        <p>temperament: {cat.temperament}</p>
                        <p>life span: {cat.life_span}</p>
                        <p>origin: {cat.origin || "unknown"}</p>
                        <p>description: {cat.description || "unknown"}</p>
                        <p>weight: {cat.weight.imperial} pounds</p>
                        <p>hypoallergenic: {cat.hypoallergenic ? "yes" : "no"}</p>
                        <p>child friendly: {"*".repeat(cat.child_friendly)}</p>
                        <p>stranger friendly: {"*".repeat(cat.stranger_friendly)}</p>
                        <p>dog friendly: {"*".repeat(cat.dog_friendly)}</p>
                        <p>grooming: {"*".repeat(cat.grooming)}</p>
                        <p>affection level: {"*".repeat(cat.affection_level)}</p>
                        <p>energy level: {"*".repeat(cat.energy_level)}</p>
                        <p>shedding level: {"*".repeat(cat.shedding_level)}</p>
                        <p>health issues: {"*".repeat(cat.health_issues)}</p>
                        <p>intelligence: {"*".repeat(cat.intelligence)}</p>
                        <p>social needs: {"*".repeat(cat.social_needs)}</p>
                    </div>
                </>
            }
        </div>
        )
    }
