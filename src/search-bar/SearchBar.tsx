import React, {useEffect, useState} from 'react';
import {Button, Form, ListGroup} from 'react-bootstrap';
import axios from "axios";

interface APIItems {
    name: {
        common: string,
        official: string,
        nativeName: {
            [key: string]: {
                official: string,
                common: string
            }
        }
    },
    flags: {
        png: string,
        svg: string,
        alt: string
    },
}

export default function SearchBar(): JSX.Element {
    const [search, setSearch] = useState<string>();
    const [items, setItems] = useState<APIItems[]>([]);
    const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout>();
    const onInput = (evt: React.FormEvent<HTMLInputElement>) => setSearch(evt.currentTarget.value);

    const searchWithDebouncing = () => {
        clearTimeout(timeoutRef);

        if (!search?.length) {
            setItems([]);
            return;
        }

        const api = 'https://restcountries.com/v3.1/name';

        const ref = setTimeout(async () => {
            const {data: response} = await axios.get<APIItems[]>(`${api}/${search}`);

            setItems(response);
        }, 1500);

        setTimeoutRef(ref);
    }

    useEffect(() => {
        searchWithDebouncing();
    }, [search]);

    return (
        <Form>
            <div className="d-flex">
                <Form.Control type="search" placeholder="Search" onInput={onInput} className="me-2"/>
                <Button variant="outline-success">Search</Button>
            </div>

            {
                items.length ?
                    <div className="position-absolute shadow px-2 mt-1" style={{width: "288px"}}>
                        {
                            items.map(({name, flags}) => {
                                return (
                                    <ListGroup horizontal="sm" className="my-2 col-12">
                                        <ListGroup.Item className="col-3">
                                            <img src={flags.png} alt={flags.alt} style={{width: "40px"}}/>
                                        </ListGroup.Item>

                                        <ListGroup.Item className="col">
                                            {name.common}
                                        </ListGroup.Item>
                                    </ListGroup>
                                );
                            })
                        }
                    </div> : <></>
            }
        </Form>
    );
}