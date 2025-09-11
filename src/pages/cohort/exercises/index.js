import Card from "../../../components/card";
import './exercises.css'

const Exercises = () => {
    return (
        <>
        <Card>
          <h4>My Exercises</h4>
          <section className={`post-interactions-container border-top`}></section>
          <p className="paragraph-text">Modules:&nbsp;&nbsp;&nbsp;&nbsp; 2/7 completed</p>
          <p className="paragraph-text">Units:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4/10 completed</p>
          <p className="paragraph-text">Exercise:&nbsp;&nbsp;&nbsp;&nbsp; 34/58 completed</p>
          <button className="see-more-button">See exercises</button>
        </Card>
        </>
    )
}

export default Exercises;