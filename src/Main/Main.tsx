import {observer} from 'mobx-react-lite';
import {useEffect, useState} from "react";
import ProductCreatorModal from "../components/ProductCreatorModal";
import ProductStoreImpl from "../Stores/ProductStore";

const Main = observer(() => {
    useEffect(() => ProductStoreImpl.getProducts, []);
    const [opened, setOpened] = useState(false);
    const [panel, setPanel] = useState(false);

    function open() {
        setOpened(true);
    }

    function close() {
        setOpened(false);
    }

    return (
        <div>
            {opened && <ProductCreatorModal  close={close} />}
            <h1>Список покупок</h1>
            {ProductStoreImpl.products.map(e => <div key={e.id}>{e.name}</div>)}
            <button onClick={open}>Добавить</button>
        </div>
    );
});

export default Main