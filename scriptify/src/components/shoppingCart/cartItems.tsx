import {NpmItem} from './npmItem';

const testPackages = [
    { _id: '1', name: 'supertest', version: '6.3.4' , date: '2024-01-14T16:41:50.357Z', repository: 'github.com/ladjs/supertest'},
    { _id: '2', name: 'superagent', version: '8.1.2' , date: '2023-08-15T22:34:23.172Z', repository: 'github.com/ladjs/superagent'},
    { _id: '3', name: 'lodash', version: '4.17.21' , date: '2021-02-20T15:42:16.891Z', repository: 'github.com/lodash/lodash'},
    { _id: '4', name: 'react', version: '18.2.0' , date: '2022-06-14T19:46:38.369Z', repository: 'github.com/facebook/react'},
    { _id: '5', name: 'axios', version: '1.6.8' , date: '2024-03-15T16:32:47.800Z', repository: 'github.com/axios/axios'},
    { _id: '6', name: 'tslib', version: '2.6.2' , date: '2023-08-18T17:41:58.755Z', repository: 'github.com/Microsoft/tslib'},
    { _id: '7', name: 'chalk', version: '5.3.0' , date: '2023-06-29T10:58:11.887Z', repository: 'github.com/chalk/chalk'},
    ]
    
const CartItems = () => {
    return (
    <div className="container mx-auto px-8 py-12">
        <h1 className='text-3xl font-bold mb-4'>Your Packages</h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {testPackages.map((npm) => {
            return (<NpmItem 
                id={npm._id} 
                name={npm.name}
                version={npm.version}
                date={npm.date}
                repository={npm.repository}
                />)
        })}
        {/* <NpmItem/> */}

        </div>
    </div>
    )
}

export default CartItems;