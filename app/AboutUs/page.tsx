/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/no-unescaped-entities
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export function generateMetadata({
  }): Metadata {
    return {
      title: `About Us - Glamouré`,
    };
  }
  

export default function AboutUs() {
    return (
        <div>
          <figure>
          <Image
            src={"https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1171&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt={"Glamouré"}
            width={800}
            height={400}
            className="h-48 object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Glamouré - About Us</h2>
            <p>Welcome to Glamouré, where luxury and style collide to offer you an extraordinary shopping experience. As a pun-inspired shopping company, we specialize in curating a stunning collection of high-end fashion and luxurious items that will elevate your wardrobe to new heights.</p>
                <p>At Glamouré, we believe that true elegance lies in the details. That's why we tirelessly search for the most exquisite pieces from renowned designers and emerging brands alike, ensuring that every item in our collection is meticulously crafted and of the utmost quality.</p>
                <p>Our website is designed with your convenience in mind, providing a seamless browsing experience that allows you to explore our carefully selected range of luxury clothing, accessories, and lifestyle products. From statement dresses that command attention to elegant accessories that add a touch of sophistication, Glamouré caters to those with a taste for refined indulgence.</p>
                <p>We prioritize the satisfaction of our customers and offer personalized assistance to ensure that your shopping journey is nothing short of exceptional. Our dedicated team of fashion experts is available to provide style advice, answer any questions you may have, and assist you throughout the purchasing process.</p>
                <p>Glamouré is not just about luxury; it's about embracing a lifestyle that exudes sophistication and refinement. We understand that quality is paramount, which is why we curate our collection with an unwavering commitment to sourcing products that embody timeless elegance. Indulge in the world of opulence and let Glamouré be your guide to a life of lavish style. Our pun-inspired name captures the essence of our brand – combining the allure of glamour with a touch of je ne sais quoi. Get ready to immerse yourself in a world of luxury that is both inspiring and enchanting at Glamouré. Elevate your fashion game and embrace the epitome of elegance today.</p>
          </div>
          </div>
      );
};