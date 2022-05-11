import {resource, ResourceItem} from "src/server";
import {VStack} from "@chakra-ui/react";
import ResourcePanel from "./resourcePanel";
import React, {useEffect, useState} from "react";
import {myCollectionTableName, getDb, isSupportIndexDB} from "src/util/indexDB";

export const MyCollectionContext = React.createContext<{
    setMyCollection: React.Dispatch<React.SetStateAction<ResourceItem[]>>
}>({
    setMyCollection: () => { }
});

const Content = () => {
    const [myCollection, setMyCollection] = useState<ResourceItem[]>([]);

    const updateMyCollection = () => {
        if (isSupportIndexDB()) {
            getDb().then((db) => {
                db.readAll(myCollectionTableName).then((res => {
                    if (res) {
                        setMyCollection(res as ResourceItem[]);
                    }
                }));
            });
        }
    };

    useEffect(() => {
        updateMyCollection();
    }, []);

    return (
        <MyCollectionContext.Provider value={{setMyCollection}}>
            <VStack
                bgColor="var(--main-bg-color)"
                alignItems="stretch"
                rowGap="30px"
                display="inline-flex"
                pos="relative"
            >
                {
                    resource.map((item) => (<ResourcePanel key={item.name} myCollection={myCollection} resource={item} hasDeleteBtn={false} hasCollectBtn={false} />))
                }
            </VStack>
        </MyCollectionContext.Provider>
    )
};

export default Content;
