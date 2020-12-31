import React from 'react'
import * as ReactBoostrap from "react-bootstrap";
import ProfilePic from "../../ProfilePic.jpg"
//import '../../App.css'
import TrivaGame from "../../TrivaGame.png"
import './home.css'
const aboutMe = () =>{
return (
    <div className='containerAboutMe'>
        <div>
            <img src={ProfilePic} className='imgSticky'/>
        </div>
        <div>
        <h2>About Me</h2>
<p>The life of a software developer..</p>
<p>Dear Hiring Manager:

 I've chosen to software development because I strongly believe that the future of the world is held in big data and cloud computing. As my previous manager once said "there is hidden value in consumer data" and it is effective/efficient to utilize the power of cloud computing to process that data for business purposes. 
During my contract at RBC, I have gained a valuable understanding of distributed systems as a whole. From the multi-source consumer data, to Kafka's publish and subscribe mechanism, to the Hadoop system. My typical day to day responsibilities included landing and transforming big data in Palantir from HDFS. In this task I had to quickly adapt to the Palantir environment and provide transformed data based on time-sensitive business requirements. 
An interesting experience was when I was assigned a deliverable to set up security using Kerberos. To be able to configure Kerberos seamlessly with the Cassandra cluster (several nodes), I've devoted extra time outside of regular work hours to research the appropriate use of Kerberos in addition to the Cassandra distributed architecture. An obstacle that I had to overcome was the poorly documented integration of Cassandra with LDAP and Kerberos for authentication and authorization of users. 
On a more general level, I believe I bring the broad “soft” skills you can have confidence in with a candidate that will represent Acme Tech to your customers. I trust you would find me to be well-spoken, energetic, confident, and accountable, the type of person on whom your customers will rely. I also have a wide breadth of experience of the type that gives you the versatility to place me in a number of contexts with confidence that the level of excellence you expect will be met.
WHICH ENDING IS BETTER?
1) I greatly appreciate you taking the time to review my credentials and experience. I hope that you'll find my experience, interests, and character intriguing enough to warrant a face-to-face meeting, as I am confident that I could provide value to you and your customers as a member of your team
OR?
2) Furthermore, I’m enthusiastic and eager about the work that I do. I find that I often get attached to the project or work that I’m involved in. I’m willing to put in the extra time and effort in order to learn and perform excellent work with tangible results. I look forward to networking with you.
Sincerely,
Fady Ibrahim, B.Eng
.</p>

        </div>
        


    </div>
)

}

export default aboutMe