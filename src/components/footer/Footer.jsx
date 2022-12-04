import React from 'react';



import Link from 'next/link'

import bg from '../../../assets/img/footer-bg.jpg';


const Footer = () => {
    console.log("bg",bg)
    return (
        <div className="footer" style={{backgroundImage: `url(${bg.src})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                       
                        <Link href="/">Movies</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link href="/">Home</Link>
                        <Link href="/">Contact us</Link>
                        <Link href="/">Term of services</Link>
                        <Link href="/">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link href="/">Live</Link>
                        <Link href="/">FAQ</Link>
                        <Link href="/">Premium</Link>
                        <Link href="/">Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link href="/">You must watch</Link>
                        <Link href="/">Recent release</Link>
                        <Link href="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
