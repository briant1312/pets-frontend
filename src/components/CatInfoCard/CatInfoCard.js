import "./CatInfoCard.scss";
import { useParams } from "react-router-dom";

const cats = require("../../data/cats.json");

export default function CatInfoCard() {
  const { catId } = useParams();
  const cat = cats.find((cat) => cat.name === catId);

  return (
    <div className="cat-info-card">
      {cat && (
        <>
          <h3>{cat.name}</h3>

          <div className="right-side">
            <div>
              {cat.image?.url && (
                <img src={cat.image.url} className="image-size" alt="cat" />
              )}
            </div>
            <h3 className="about-breed">About the Breed</h3>
            <p>{cat.description}</p>
            <p>
              <span>Temperament:</span> {cat.temperament}
            </p>
            <p>
              <span>Life span:</span> {cat.life_span}
            </p>
            <p><span>Origin:</span> {cat.origin || "unknown"}</p>
            <p><span>Weight:</span> {cat.weight.imperial} lbs</p>
            {/* <p>hypoallergenic: {cat.hypoallergenic ? "yes" : "no"}</p>
                        <p>child friendly: {"*".repeat(cat.child_friendly)}</p>
                        <p>stranger friendly: {"*".repeat(cat.stranger_friendly)}</p>
                        <p>dog friendly: {"*".repeat(cat.dog_friendly)}</p>
                        <p>grooming: {"*".repeat(cat.grooming)}</p>
                        <p>affection level: {"*".repeat(cat.affection_level)}</p>
                        <p>energy level: {"*".repeat(cat.energy_level)}</p>
                        <p>shedding level: {"*".repeat(cat.shedding_level)}</p>
                        <p>health issues: {"*".repeat(cat.health_issues)}</p>
                        <p>intelligence: {"*".repeat(cat.intelligence)}</p>
            <p><span>Social needs:</span> {"*".repeat(cat.social_needs)}</p> */}
          </div>
        </>
      )}
    </div>
  );
}
