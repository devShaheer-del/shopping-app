import React from 'react'
import tshirt from '../assets/images/tshirt.png';
import hoodie from '../assets/images/hoddie.png';
import polo from '../assets/images/polo.png';
import trouser from '../assets/images/trouser.png';
function Cards() {

    const Products = [
        {
            name: 'T-Shirt',
            image: tshirt,
            price: 100,
        },
        {
            name: 'Mens Hoodie',
            image: hoodie,
            price: 200,
        }, {
            name: 'Polo',
            image: polo,
            price: 150,
        }, {
            name: 'Trouser',
            image: trouser,
            price: 300,
        }
    ]

    return (
        <>


            {
                Products.map((item, index) => {
                    return (
                        <div className="card" style={{width :'15rem'}} key={index}>
                            <img src={item.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <span >{item.price}</span>

                                <button className="btn btn-warning">Add To Cart</button>
                            </div>
                        </div>
                    );
                })
            }


        </>
    )
}

export default Cards
