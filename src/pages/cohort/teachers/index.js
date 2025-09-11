import Card from "../../../components/card";
import './style.css';
import UserIcon from "../../../components/profile-icon";

const Teachers = () => {

    return (
        <>
        <Card>
            <h4 className="border-line">Teachers</h4>
            <section className="teachers-list">
                <UserIcon initials="AJ" firstname="Alice" lastname = "Johnson" role="Software Development"/>
            </section>
        </Card>
        </>
    );
}

export default Teachers;
