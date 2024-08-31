import React from 'react'
import ProductCard from './ProductCard'
import { useNavigate } from "react-router-dom";
import { useCart } from '../cart/CartContext';

const Products = () => {

  

    const style = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr ",
        gap: "25px",
       
         paddingLeft: "90px"
       
    }


    const perfumes = [
        
            {"id": "001", "name": "212 Men NYC", "image": "/images/212 Men NYC 85k men.jpg ",  "price": 85000},
            {"id": "002", "name": "Ajiwad ", "image": "/images/Ajiwad 20k female.jpg",  "price": 20000},
            {"id": "003", "name": "Amber", "image": "/images/Amber 6k unisex.jpg", "price": 6000},
            {"id": "004", "name": "Amber Black", "image": "/images/Amber black 6k men.jpg",  "price": 6000},
            {"id": "005", "name": "Amber Blue", "image": "/images/Amber Blue 6k masc.jpg", "price": 6000},
            {"id": "006", "name": "Amber Red", "image": "/images/Amber red 6k female.jpg", "price": 16000},
            {"id": "007", "name": "Amberley Pur OUD", "image": "/images/Amberley Pur oud 45k men.jpg",  "price": 45000},
            {"id": "008", "name": "Amourage Set", "image": "/images/AMourage Set 10k Men.jpg",  "price": 10000},
            {"id": "009", "name": "Armani", "image": "/images/armani 10k unisex.jpg",  "price": 10000},
            {"id": "010", "name": "Asad", "image": "/images/Asad 29k men.jpg",  "price": 29000},
            {"id": "011", "name": "Asad zanzebar", "image": "/images/Asad zanzebar 21k men.jpg", "price": 21000},
            {"id": "012", "name": "Baby Love Mist", "image": "/images/Baby LOve Mist 2.5k kids.jpg",  "price": 2500},
            {"id": "013", "name": "Bakkarat Rouge", "image": "/images/Bakkarrat Rouge 19k unisex.jpg", "price": 19000},
            {"id": "014", "name": "Body Mist", "image": "/images/Body Mist 3k fem.jpg", "price": 3000},
            {"id": "015", "name": "Body Mist", "image": "/images/Body Mist2 2k female.jpg",  "price": 2000},
            {"id": "016", "name": "Clive Doris", "image": "/images/Clive Doris 10k male.jpg", "price": 10000},
            {"id": "017", "name": "Dimmah", "image": "/images/Dimmah 21.5k unisex.jpg",  "price": 21500},
            {"id": "018", "name": "E'CLAT", "image": "/images/E'CLAT 50k female.jpg",  "price": 50000},
            {"id": "019", "name": "Greatness Noir", "image":  "/images/Greatness Noir 2 7k men.jpg",  "price": 7000},
            {"id": "020", "name": "Greatness Noir", "image":  "/images/Greatness Noir 7k men.jpg", "price": 7000},
            {"id": "021", "name": "Greatness Noir", "image":  "/images/Greatness noir3 7k uni.jpg", "price": 7000},
            {"id": "022", "name": "Haya", "image":  "/images/Haya 20k female.jpg",  "price": 20000},
            {"id": "023", "name": "Hayatti", "image":  "/images/Hayatti 20k female.jpg", "price": 20000},
            {"id": "024", "name": "Heibah", "image":  "/images/Heibah 17k female.jpg", "price": 17000},
            {"id": "025", "name": "Home Diffuser", "image": "/images/Home diffuser2 10k.jpg",   "price": 10000},
            {"id": "027", "name": "Home Diffuser", "image":  "public/images/Home diffuser3 15k .jpg",  "price": 15000},
            {"id": "028", "name": "Home Diffuser", "image": "public/images/Home diffuser4 17k .jpg",  "price": 17000},
            {"id": "029", "name": "Home Diffuser", "image": "public/images/Home diffuser5 8k.jpg",  "price": 8000},
            {"id": "030", "name": "Home Diffuser", "image": "public/images/Home Diffusers 12k .jpg",  "price": 12000},
            {"id": "031", "name": "jo Malone", "image": "public/images/Jo malone 300k men.jpg",  "price": 300000},
            {"id": "032", "name": "Lataffa Al Ameed", "image": "public/images/Lataffa Al Ameed 27k men.jpg", "price": 27000},
            {"id": "033", "name": "Lataffa Yara", "image": "public/images/Lataffa Yara 21k female.jpg", "price": 21000},
            {"id": "034", "name": "lataffa Bade'e Al OUD", "image": "public/images/Lataffe Bade'e Al Oud 30k men.jpg ",  "price": 30000},
            {"id": "035", "name": "Lataffa OUD", "image": "public/images/Lateffa OUD 21k fem.jpg ",  "price": 21000},
            {"id": "036", "name": "Mayar", "image": "public/images/Mayar 20k female.jpg ",  "price": 20000},
            {"id": "037", "name": "Monsieur", "image": "public/images/Monsieur 16.5k men.jpg ",  "price": 16500},
            {"id": "038", "name": "Mousuf Combo", "image": "public/images/Mousuf Combo 21k men.jpg ",  "price": 21000},
            {"id": "039", "name": "Mousuf Lataffa", "image": "public/images/Mousuf Lataffa 18k .jpg ",  "price": 18000},
            {"id": "040", "name": "Mousuf Ramadi", "image": "public/images/Mousuf Ramadi 17k men.jpg ",  "price": 17000},
            {"id": "041", "name": "Mousuf Wardi", "image": "public/images/Mousuf Wardi 18k female.jpg" ,  "price": 18000},
            {"id": "042", "name": "Musk", "image": "public/images/Musk 12k female.jpg",  "price": 12000},
            {"id": "043", "name": "Mousuf", "image": "public/images/Musuf 5.5k uni.jpg ",  "price": 5500},
            {"id": "044", "name": "Mystical", "image": "public/images/Mystical 2 10k female.jpg",  "price": 10000},
            {"id": "045", "name": "Mystical", "image": "public/images/Mystical 10k unisex.jpg ",  "price": 10000},
            {"id": "046", "name": "Naseem Raw Fragrance", "image": "public/images/Naseem Raw Fragrance 35k Unisex.jpg ",  "price": 35000},
            {"id": "047", "name": "NOW", "image": "public/images/NOW 27k men.jpg",  "price": 27000},
            {"id": "048", "name": "Ophylia Combo", "image":"public/images/Orphylia Combo 18.5k female.jpg",  "price": 18500},
            {"id": "049", "name": "Perfume Oil", "image": "public/images/perfume oil 700 unisex.jpg",  "price": 700},
            {"id": "050", "name": "Pocket Pencil Perfume", "image": "public/images/Pocket bpencil perfume 1.5k female.jpg ",  "price": 1500},
            {"id": "051", "name": "Prive Collection Oil", "image": "public/images/Prive collection Oil 8k female.jpg ",  "price": 8000},
            {"id": "052", "name": "Riggs Body Spray", "image": "public/images/Riggs body spray 4.5kj unisex.jpg ",  "price": 4500},
            {"id": "053", "name": "Right Peach Combo", "image": "public/images/Right Peach Combo 15k female.jpg ",  "price": 15000},
            {"id": "054", "name": "Rose Seduction Secret", "image": "public/images/Rose Seduction Secret 70k female.jpg ",  "price": 70000},
            {"id": "055", "name": "Scandal Set", "image": "public/images/scandal set 15k female.jpg",  "price": 15000},
            {"id": "056", "name": "Smart Collection Oil","image": "public/images/Smart collection oil 2.2k uni.jpg ",  "price": 2200},
            {"id": "057", "name": "Sugar Aby", "image": "public/images/Sugar aby 10k female.jpg ",  "price": 10000},
            {"id": "058", "name": "Supremacy In OUD", "image": "public/images/Supremacy In OUD 300k men.jpg ",  "price": 300000},
            {"id": "059", "name": "Suspenso Combo", "image": "public/images/suspenso Combo 15k men.jpg ",  "price": 15000},
            {"id": "060", "name": "Tabac", "image": "public/images/Tabac 20k men.jpg ",  "price": 20000},
            {"id": "061", "name": "Tom Ford Ombre Leather", "image": "public/images/Tom Ford Ombre Leather 250k men.jpg",  "price": 250000},
            {"id": "062", "name": "Touch Oil", "image": "public/images/Touch Oil 1.5k uni.jpg ",  "price": 1500},
            {"id": "063", "name": "Victoria's Secret Combo", "image": "public/images/Victoria secret combo 18k female.jpg",  "price": 18000},
            {"id": "064", "name": "Victoria's Secret Body Mist", "image": "public/images/Victorias Secret Body Mist 4.5k.jpg",  "price": 4500},
            {"id": "065", "name": "YARA Combo", "image": "public/images/YARA COMBO 30k female.jpg ",  "price": 30000},
            {"id": "066", "name": "Washwashah", "image": "public/images/Washwashah 20k female.jpg ",  "price": 20000},
            {"id": "066", "name": "Yves Saint Laurent", "image": "public/images/Yves Saint Laurent 50k unisex.jpg ",  "price": 50000},
            {"id": "067", "name": "Zara Set", "image": "public/images/Zara set 22k female.jpg",  "price": 22000},
            {"id": "068", "name": "Zara Set", "image": "public/images/Zara set2 25k men.jpg",  "price": 25000},
            {"id": "069", "name": "Zara Set", "image": "public/images/Zara set3 22k FEmale.jpg ",  "price": 22000},
           
            
        
    ]

    const navigate = useNavigate();

    // handle open product details
    const openProductDetails = (id) => { 
      console.log("Product ID: ", id);
      // navigate to product details page
      navigate(`/product/${id}`);
    };
    
  return (

    <div className='fum' >
      <div className='scoot'><h1>Browse our full range of fragrances</h1>
  
      </div>
      <div className='boot' style={style}>
         {perfumes.map((product) => (
          <ProductCard img={product.image} name={product.name}
           price={product.price}   func={() => addToCart(product)}/>
         ))}
         </div>
    </div>
  )
}

export default Products