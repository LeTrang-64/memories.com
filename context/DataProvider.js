import React from 'react'
import db from "../config/firebaseConfig";

export const DataContext = React.createContext({})

export const DataProvider = ({children}) => {
    const [data, setData] = useState([]);

    //  lấy thông tin user từ api
    useEffect(() => {
        const sub = db.collection("todos")
            .onSnapshot(snap => {
                let arr = [];
                snap.forEach((doc) => {
                    const newData = {
                        id: doc.id,
                        ...doc.data()
                    }
                    arr.push(newData)
                });
                setData(arr);
                console.log('get data done')
            })

        return () => {
            if (sub) sub()
        }
    }, [])

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}