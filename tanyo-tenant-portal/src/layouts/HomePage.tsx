import { useParams } from 'react-router-dom';
import Body from "../components/Body";
import Header from "../components/Header";

const HomePage = () => {
    const { tenantName, category, categoryId, tenantId } = useParams();

    const parseUrlParams = () => {
        return {
            tenantName,
            category,
            categoryId,
            tenantId
        };
    };

    // You can use parseUrlParams() to get the parameters whenever needed
    const urlParams = parseUrlParams();
    console.log('URL Parameters:', urlParams);

    return (
        <div className="top-0 absolute! w-full">
            <Header />
            <Body categoryId={categoryId} tenantId={tenantId} />
        </div>
    )
}

export default HomePage;
