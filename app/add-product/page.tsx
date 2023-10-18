export const metadata = {
    title: "Add Product - Flowmazon"
}

export default function AddProductPage() {
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form>
                <input 
                required 
                name="name" 
                placeholder="Name"
                className="mb-3 w-full input input-bordered" />
                <textarea 
                required 
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered mb-3 w-full" />
                <input 
                required 
                name="imageUrl" 
                placeholder="Image Url"
                type= "url"
                className="mb-3 w-full input input-bordered" />
                <input 
                required 
                name="price" 
                placeholder="Price"
                type= "number"
                className="mb-3 w-full input input-bordered" />
                <button type = "submit" className="btn btn-primary btn-block">Add Product</button>
            </form>
        </div>
    )
}