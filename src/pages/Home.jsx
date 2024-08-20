import { motion } from "framer-motion";
import moi from '../assets/Images/1.jpg';


const wrapperVariants = {
    hidden: {opacity:0, y:-100},
    visible: {opacity:1, y:0, transition: {when: 'afterChildren'}},
    transition: {type: 'spring', duration: 3, repeat: 'infinity'}
}

export function Home ()
{
    return (
        <motion.div 
            className="contentCV"
            variants={wrapperVariants}
            whileTap={{scale: 1.03}}
            initial={'hidden'} 
            animate={'visible'}
            layout
        >
        <div className="imageNom">
            <span style={{fontSize: '24px',fontWeight: 'bold'}}>Luc FOTSO</span>
            <br/>
            <span>Fullstack developer</span>
        </div>
        <header>
                <ul className="nav">
                <a href="#"><li style={{color: '#f19419', borderBottom: '5px solid #f19419'}}>HOME</li></a>
                <a href="#"><li>RESEAU</li></a>
                <a href="#"><li>CONTACT</li></a>
            </ul>
        </header>
        <div className="about">
            <img src={moi} alt="img" id="imagePers"/>
            <div className="texte">
                <h1>Hello,</h1>
                <h3>a bit about me:</h3>
                <div className="categorie">
                    <div className="cate" style={{background: '#37214d'}}>
                        <span>MY RESUME</span>
                    </div>
                    <div className="cate" style={{background: '#f19419'}}>
                        <span>MY WORK</span>
                    </div>
                    <div className="cate" style={{background: '#36bbf5'}}>
                        <span>MY SKILLS</span>
                    </div>
                </div>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum obcaecati in, non maxime id consequuntur optio labore fugiat amet ipsam? Suscipit modi facilis asperiores nihil error libero consequatur odit veritatis.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum obcaecati in, non maxime id consequuntur optio labore fugiat amet ipsam? Suscipit modi facilis asperiores nihil error libero consequatur odit veritatis.
                    Harum obcaecati in, non maxime id consequuntur optio labore fugiat amet ipsam?
                </p>
            </div>           
        </div>
        <div className="foot">
            <div className="call">
                <ul>
                Call <i className="fa-solid fa-phone"></i>
                <li>T.123-456-7890</li>
                    <li>F.123-456-7890</li>
                </ul>
            </div>
            <div className="contact">
                <ul>
                Contact <i className="fa-solid fa-globe"></i>
                    <li>info@mysite.com</li>
                </ul>
            </div>
            <div className="follow">
                Follow me <i className="fa-solid fa-hashtag"></i>
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
            </div>  
            <div className="copy">
                &copy; 2024 by the_solver <br/> Proudly created with the_solver.com 
            </div>
        </div>
    </motion.div>
    )
}