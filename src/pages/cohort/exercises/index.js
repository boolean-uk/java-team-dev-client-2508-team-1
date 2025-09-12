import Card from "../../../components/card";
import './exercises.css'

const Exercises = () => {
    return (
        <>
        <Card>
            <h4>My Exercises</h4>
            <section className="post-interactions-container border-top"></section>

            <div className="exercise-row">
                <span className="label">Modules:</span>
                <span className="value">2/7 completed</span>
            </div>

            <div className="exercise-row">
                <span className="label">Units:</span>
                <span className="value">4/10 completed</span>
            </div>

            <div className="exercise-row">
                <span className="label">Exercise:</span>
                <span className="value">34/58 completed</span>
            </div>

            <button className="see-more-button">See exercises</button>
        </Card>
        </>
    )
}

export default Exercises;