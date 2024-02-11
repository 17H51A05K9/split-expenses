import { useEffect, useState } from "react";
import Container from "./container";

export default function () {
    const [name, names] = useState([]);
    const [total, totalExpense] = useState(0);
    const [options, optionValues] = useState("");
    const [desc, description] = useState("");
    const [amount, amounts] = useState("");
    const [paid, paidby] = useState("");
    const [form_values, setFormValues] = useState([]);
    const addNamesToLocalStorage = (e) => {
        e.preventDefault();
        const form_value = e.target.name.value;
        console.log(form_value);
        const formData = { "name": form_value, "amount": 0 }
        names([...name, formData]);
        optionValues("");
    }
    const addExpenses = (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        let c = 0;
        name.map((item) => {
            if (item.name == formData.get("paidvalue")) {
                let a = (parseFloat(parseFloat(formData.get("amount")) / name.length).toPrecision(4) - parseFloat(formData.get("amount")).toPrecision(4)).toPrecision(4);
                item.amount = parseFloat(parseFloat(item.amount) + parseFloat(a)).toFixed(2);
            }
            else {
                let a = (parseFloat(formData.get("amount")) / name.length).toPrecision(4);
                item.amount = parseFloat(parseFloat(item.amount) + parseFloat(a)).toFixed(2);

            }
        });
        // name.map((item) => {
        //     if (item.name == formData.get("paidvalue")) {
        //         item.amount = item.amount - (divideAmount*c);
        //     }
        // })
        names([...name]);
        description("");
        amounts("");
        paidby("");
        setFormValues([...form_values, Object.fromEntries(formData)]);
        totalExpense(parseInt(total) + parseInt(formData.get("amount")));
        localStorage.setItem("total", parseInt(total) + parseInt(formData.get("amount")));
    }

    useEffect(() => {
        if (form_values && form_values.length != 0)
            localStorage.setItem("expenses", JSON.stringify(form_values));
    }, [form_values])

    useEffect(() => {
        if (name && name.length != 0)
            localStorage.setItem("names", JSON.stringify(name));
    }, [name])

    useEffect(() => {
        setFormValues(JSON.parse(localStorage.getItem("expenses")) || []);
        names(JSON.parse(localStorage.getItem("names")) || []);
        totalExpense(localStorage.getItem("total") || 0);
    }, [])
    return (<>
        <div className="bg-[url('https://t3.ftcdn.net/jpg/03/91/46/10/360_F_391461057_5P0BOWl4lY442Zoo9rzEeJU0S2c1WDZR.jpg')]">
            <h1 className="justify-center text-center text-red-700 text-xl">Note: Before adding Expenses, add options on the left side and then add expenses.</h1>
            <Container className="flex items-center justify-center gap-8">
                <section class="bg-white dark:bg-gray-900 rounded-lg">
                    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                        <h2 class="mb-4 md:text-3xl sm:text-xs font-bold text-gray-900 dark:text-white">Add the Members</h2>
                        <form action="#" onSubmit={addNamesToLocalStorage}>
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="sm:col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Name</label>
                                    <input type="text" id="name" name="name" placeholder="This name is added as option value on your right side of form" value={options} onChange={(e) => { optionValues(e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                                </div>
                            </div>
                            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Add option
                            </button>
                        </form>
                    </div>
                </section>
                <div>
                    <button className="rounded-lg bg-gray-900 max-w-48 md:w-44 sm:w-24 max-h-40 md:h-40 sm:h-24 shadow-lg  md:text-6xl sm:text-xl"><h3 className="md:text-xl sm:text-sm">Total Expenses</h3>{total}</button>
                </div>
                <section class="bg-white dark:bg-gray-900 rounded-lg">
                    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                        <h2 class="mb-4 md:text-3xl sm:text-xs font-bold text-gray-900 dark:text-white">Add a new Expense</h2>
                        <form action="#" onSubmit={addExpenses}>
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="sm:col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expense Description</label>
                                    <input type="text" id="description" name="description" placeholder="Description" value={desc} onChange={(e) => { description(e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                                </div>

                                <div class="w-full">
                                    <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                                    <input type="number" id="amount" name="amount" value={amount} onChange={(e) => { amounts(e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                                </div>
                                <div>
                                    <label for="paidvalue" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paid By</label>
                                    <select id="paidvalue" name="paidvalue" value={paid} onChange={(e) => { paidby(e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected="" className="uppercase">Select Paid By</option>
                                        {name.map((value) => {
                                            return (
                                                <option className="uppercase">{value.name}</option>
                                            )
                                        }
                                        )}
                                    </select>
                                </div>

                            </div>
                            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Add Expense
                            </button>
                        </form>
                    </div>
                </section>
                {/* <form action="POST" className="w-full max-w-lg" onSubmit={addExpenses}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block  tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="description">
                            Expense Description
                        </label>
                        <input className="appearance-none block w-full bg-white-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="description" name="description" type="text" placeholder="Description" value={desc} onChange={(e) => { description(e.target.value) }} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block  tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="amount">
                            Amount
                        </label>
                        <input className="appearance-none block w-full bg-white-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="amount" name="amount" type="text" placeholder="Amount" value={amount} onChange={(e) => { amounts(e.target.value) }} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block  tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="paidvalue">
                            Paid By
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="paidvalue" name="paidvalue" value={paid} onChange={(e) => { paidby(e.target.value) }}>
                                <option>Select Paid By</option>
                                {name.map((value) => {
                                    return (
                                        <option>{value.name}</option>
                                    )
                                }
                                )}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex items-center space-x-4">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Add Expense
                    </button>
                </div>
            </form> */}

            </Container>

            <Container className="flex flex-wrap  items-center justify-center">
                {name.map((value) => {
                    return (
                        <div className="p-4">
                            <button className=" rounded-lg bg-gray-400 w-56 h-40 shadow-lg shadow-gray-400/50 text-6xl"><h3 className="text-xl uppercase">{value.name}</h3>{value.amount}</button>
                        </div>
                    )
                }
                )}


            </Container>
            <Container className="flex items-center justify-center">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Expense Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Amount
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Paid By
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {form_values.map((value) => {
                                return (<TableLayout description={value.description} price={value.amount} paidby={value.paidvalue} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </Container>
        </div>
    </>);
}

const TableLayout = (props) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {props.description}
            </th>
            <td className="px-6 py-4">
                {props.price}
            </td>
            <td className="px-6 py-4">
                {props.paidby}
            </td>
        </tr>
    )
}
