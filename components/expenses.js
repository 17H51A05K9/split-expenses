"use client"
import { useEffect, useState } from "react";
import Container from "../components/container";



export default function MyExpenses() {
    const [red, red1] = useState(0);
    const [green, green1] = useState(0);
    const [yellow, yellow1] = useState(0);
    const [form_values,setFormValues] = useState([]);
    const [item,itemName]=useState("");
    const [price,priceAmount]=useState("");
    const [desc,Description]=useState("");
    const handleSubmit =  (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        var form=Object.fromEntries(formData);
        setFormValues([...form_values,Object.fromEntries(formData)])
        if (form.cash == "Cash In") {
            green1(green + parseInt(form.price));
            yellow1(yellow + parseInt(form.price));
            localStorage.setItem("green",green + parseInt(form.price));
            localStorage.setItem("yellow", yellow + parseInt(form.price));
        }
        else if (form.cash == "Cash Out") {
            red1(red + parseInt(form.price));
            yellow1(yellow - parseInt(form.price));
            localStorage.setItem("yellow", yellow - parseInt(form.price));
            localStorage.setItem("red", red + parseInt(form.price));
        }
        // await fetch("https://api.jsonbin.io/v3/b/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "X-Master-Key": "$2a$10$8bp29Z5.ru.WsDJlth9grOsNn9jnTtQLOPvhxoR7wfKTyayKhnbS.",
        //         "X-Collection-Id": "65bbddcbdc746540189eea0f"
        //     },
        //     body: JSON.stringify(form_values)
        // })

        // await fetch("https://api.jsonbin.io/v3/c/65bbddcbdc746540189eea0f/bins/", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "X-Master-Key": "$2a$10$8bp29Z5.ru.WsDJlth9grOsNn9jnTtQLOPvhxoR7wfKTyayKhnbS.",
        //         "X-Collection-Id": "65bbddcbdc746540189eea0f"
        //     },
        // }).then(async (data) => {
        //     items = await data.json();

        //     for (let i = 0; i < items.length; i++) {
        //         await fetch("https://api.jsonbin.io/v3/b/" + items[i].record + "/", {
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "X-Master-Key": "$2a$10$8bp29Z5.ru.WsDJlth9grOsNn9jnTtQLOPvhxoR7wfKTyayKhnbS.",
        //                 "X-Collection-Id": "65bbddcbdc746540189eea0f"
        //             }
        //         })
        //             .then(async (data) => {
        //                 data = await data.json();
        //                 binData.push(data);
        //             })
        //     }
        //     console.log(binData);
        // })
        itemName("");
        priceAmount("");
        Description("");   
    }
    useEffect(() => {
        if(form_values && form_values.length!=0){
            localStorage.setItem("formData",JSON.stringify(form_values));
        }
        
    },[form_values])

    useEffect(() => {
        setFormValues(JSON.parse(localStorage.getItem("formData")) || []);
        (localStorage.getItem("red")!="NaN" && localStorage.getItem("red"))?red1(localStorage.getItem("red")):red1(0);
        (localStorage.getItem("green")!="NaN" && localStorage.getItem("green"))?green1(localStorage.getItem("green")):green1(0);
        (localStorage.getItem("yellow")!="NaN" && localStorage.getItem("yellow"))?yellow1(localStorage.getItem("yellow")):yellow1(0);
    },[])
    return (
        <>
        <div className="bg-[url('https://t3.ftcdn.net/jpg/03/91/46/10/360_F_391461057_5P0BOWl4lY442Zoo9rzEeJU0S2c1WDZR.jpg')]">
            <Container className="flex items-center justify-center gap-8">
                <button className="rounded-lg bg-red-500 max-w-40 md:w-1/6 sm:w-1/2 max-h-60 md:h-40 sm:h-40 shadow-lg shadow-red-500/50 md:text-6xl sm:text-xl"><h3 className="md:text-xl sm:text-sm">Cash Out</h3>{red}</button>
                <button className=" rounded-lg bg-green-500 max-w-40 md:w-1/6 sm:w-1/2 max-h-60 md:h-40 sm:h-40 shadow-lg shadow-green-500/50 md:text-6xl sm:text-xl"><h3 className="md:text-xl sm:text-sm">Cash In</h3>{green}</button>
                <button className=" rounded-lg bg-yellow-500 max-w-40 md:w-1/6 sm:w-1/2 max-h-60 md:h-40 sm:h-40 shadow-lg shadow-yellow-500/50 md:text-6xl sm:text-xl"><h3 className="md:text-xl sm:text-sm">Balance</h3>{yellow}</button>
            </Container>
            <div className="flex items-center justify-center">
                <section className="bg-white dark:bg-gray-900 rounded-lg">
                    <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Item</h2>
                        <form action="POST" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type item name" required="" value={item} onChange={(e)=>{itemName(e.target.value)}} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$299" required="" value={price} onChange={(e)=>{priceAmount(e.target.value)}}/>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="cash" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type</label>
                                    <select id="cash" name="cash" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option className="text-green-600">Cash In</option>
                                        <option className="text-red-600">Cash Out</option>

                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="description" name="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a product description here..." required="" value={desc} onChange={(e)=>{Description(e.target.value)}}></textarea>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <Container className="flex items-center justify-center">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Item Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Price
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Description
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Cash In/Cash Out
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                               {form_values.map((value) => {
                                   return( <TableLayout name={value.name} price={value.price} in_out={value.cash} description={value.description} />
                                )})}
                        </tbody>
                    </table>
                </div>

            </Container>
            </div>
        </>
    );
}

const TableLayout = (props) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {props.name}
            </th>
            <td className="px-6 py-4">
                {props.price}
            </td>
            <td className="px-6 py-4">
                {props.description}
            </td>
            <td className="px-6 py-4">
                {props.in_out}
            </td>
        </tr>
    )
}



