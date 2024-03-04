import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MY_SERVER = 'http://127.0.0.1:8000/';

const App = () => {
    const [drugs, setDrugs] = useState([]);
    const [fName, setFName] = useState("");
    const [price, setPrice] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [selectedDrug, setSelectedDrug] = useState(null); // Track selected drug for update

    useEffect(() => {
        // console.log( localStorage.getItem("token"))
        const token = localStorage.getItem("token")
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        if (token) {
        axios.get(MY_SERVER + "drugs/", axiosConfig).then(res => setDrugs(res.data))
        }
    }, [refresh]);

    const addDrug = async () => {
        try {
            const formData = new FormData();
            formData.append('fName', fName);
            formData.append('price', price);
            formData.append('image', imageFile);

            await axios.post(MY_SERVER + "adddrug", formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setRefresh(!refresh);
            setFName("");
            setPrice(0);
            setImageFile(null);
        } catch (error) {
            console.error('Error adding drug:', error);
        }
    };

    const deleteDrug = async (id) => {
        try {
            await axios.delete(MY_SERVER + "deldrug/" + id, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error deleting drug:', error);
        }
    };

    const updateDrug = async () => {
        try {
            const formData = new FormData();
            formData.append('fName', selectedDrug.fName);
            formData.append('price', selectedDrug.price);
            formData.append('image', selectedDrug.image);

            await axios.put(MY_SERVER + `updatedrug/${selectedDrug.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setRefresh(!refresh);
        } catch (error) {
            console.error('Error updating drug:', error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedDrug({
            ...selectedDrug,
            image: e.target.files[0]
        });
    };

    const handleEdit = (drug) => {
        setSelectedDrug(drug);
    };

    return (
        <div className="container">
            <h1 className="mt-5">Number of drugs: {drugs.length}</h1>
            {drugs.map(drug =>
                <div key={drug.id} className="mt-3">
                    <p>Name: {drug.fName}, Price: {drug.price}</p>
                    {drug.image && <img src={`${MY_SERVER}${drug.image}`} alt="Drug" style={{ maxWidth: '100px' }} />} {/* Display image */}
                    <button className="btn btn-danger" onClick={() => deleteDrug(drug.id)}>Delete</button>
                    <button className="btn btn-primary ml-2" onClick={() => handleEdit(drug)}>Edit</button>
                </div>
            )}

            <div className="mt-5">
                <label>Name:</label>
                <input className="form-control" type="text" value={fName} onChange={(e) => setFName(e.target.value)} />
            </div>
            <div className="mt-3">
                <label>Price:</label>
                <input className="form-control" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="mt-3">
                <label>Image:</label>
                <input className="form-control-file" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>
            <button className="btn btn-primary mt-3" onClick={addDrug}>Add Drug</button>
            {selectedDrug && (
                <div>
                    <h2>Edit Drug</h2>
                    <div>
                        <label>Name:</label>
                        <input className="form-control" type="text" value={selectedDrug.fName} onChange={(e) => setSelectedDrug({ ...selectedDrug, fName: e.target.value })} />
                    </div>
                    <div className="mt-3">
                        <label>Price:</label>
                        <input className="form-control" type="number" value={selectedDrug.price} onChange={(e) => setSelectedDrug({ ...selectedDrug, price: e.target.value })} />
                    </div>
                    <div className="mt-3">
                        <label>Image:</label>
                        <input className="form-control-file" type="file" onChange={handleFileChange} />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={updateDrug}>Update Drug</button>
                </div>
            )}
        </div>
    );
};

export default App;
