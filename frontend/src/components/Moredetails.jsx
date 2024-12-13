import { useLocation } from 'react-router-dom';

export default function Moredetails() {
    const location = useLocation();
    const {product_name,product_price ,product_dicount, final_price ,  product_quanity , product_image } = location.state || {}

    return <div>
        <p>Testing data sending data from one component to another using Usenavigate and Uselocation </p>
        <p> {product_name} </p>
        <p>More details here</p>
    </div>
}