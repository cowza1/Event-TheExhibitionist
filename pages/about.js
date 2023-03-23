import { render } from "react-dom";
import Nav from './components/nav';
import styles from '@/styles/Home.module.css';
import Image from 'next/image'
import Museum from '../public/museum.jpg'

function About () {
return (
    <div>
        <Nav/>
        <div className={styles.main}>
            <div className="p-5 h-full rounded-sm">
                <div className="m-12  text-center bg-gradient-to-b from-orange-100 p-5" style={{margin: "auto"}}>
                <h1 className="leading-8 my-2 text-2xl text-center">Welcome to to the Exhibitionist</h1>
                    <h3 className="text-xl my-2">We aim to inspire people to travel through art</h3>
                    <p className="leading-8 my-4">We understand that deciding where to travel can be a daunting task, which is why we've created a platform to help you explore the world through art exhibitions and galleries.</p>
                    <p className="leading-8 my-4">Our website provides a user-friendly platform for you to search for exhibitions and galleries all around the world. You can easily search for the opening times, dates, locations and descriptions of various exhibitions in different countries. We believe that art is a universal language that can connect people from all around the world, and through our website, we hope to facilitate this connection.</p>
                    <p className="leading-8 my-4">We are passionate about art and travel, and we believe that combining the two can create a truly unique and enriching experience. Our mission is to make it easier for people to explore the world through art, and we hope to encourage more people to embrace cultural diversity and experience the beauty of different countries.</p>
                    <div className="my-8">
                        <Image src={Museum} className="m-auto" style={{width: "500px"}}></Image>
                    </div>
                    <p className="leading-8 my-2">Thank you for visiting our website, and we hope you find the information here helpful in planning your next adventure.</p>
                </div>
            </div>
        </div>
    </div>
)
}

export default About;
