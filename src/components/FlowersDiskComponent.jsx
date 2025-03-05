import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlowersDisk, updateFlowersDisk } from "../redux/slices/flowersdiskSlice";
import { useParams } from "react-router-dom";

const FlowersDiskComponent = () => {
    const dispatch = useDispatch();
    const flowers = useSelector((state) => state.flowersdisk?.items || []);// temporarily so it renders wakha reducer khawi
    const { id } = useParams();
    
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [smallImg, setSmallImg] = useState(null);
    const [largeImg, setLargeImg] = useState(null);

    // Fetch flowers on component mount
    useEffect(() => {
        dispatch(fetchFlowersDisk());
    }, [dispatch]);

    // Select flower when clicked
    useEffect(() => {
        if (flowers.length > 0 && id) {
            const flower = flowers.find((flower) => flower.id === parseInt(id));
            setSelectedFlower(flower || null);
        }
    }, [flowers, id]);

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (type === "small") {
            setSmallImg(file);
        } else {
            setLargeImg(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFlower) return;

        const formData = new FormData();
        formData.append("name", selectedFlower.name);
        formData.append("description", selectedFlower.description);
        if (smallImg) formData.append("small_img", smallImg);
        if (largeImg) formData.append("large_img", largeImg);

        const result = await dispatch(updateFlowersDisk({ id: selectedFlower.id, data: formData }));

        if (result.payload) {
            console.log("Flower updated successfully:", result.payload);
        } else {
            console.error("Failed to update flower");
        }
    };

    return (
        <div>
            <h3>Flowers disk</h3>
                    <div className="disk">
            <div className="flowers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', overflowY: 'scroll', maxHeight: '400px' }}>
                {flowers.map((flower) => (
                    <div key={flower.id} className="flower-card" style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                        <input
                            type="radio"
                            name="flower"
                            value={flower.id}
                            checked={selectedFlower && selectedFlower.id === flower.id}
                            onChange={() => setSelectedFlower(flower)}
                        />
                        <img src={flower.small_img} alt={flower.name} style={{ width: '100%', height: 'auto' }} />
                        <p>{flower.name}</p>
                        <p>{flower.description}</p>
                    </div>
                ))}
            </div>

            {selectedFlower && (
                <div>
                    <h2>Update Flower: {selectedFlower.name}</h2>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, "small")}
                        accept="image/*"
                    />
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, "large")}
                        accept="image/*"
                    />
                    <button onClick={handleSubmit}>Update Flower</button>
                </div>
            )}
        </div>
        </div>
    );
};

export default FlowersDiskComponent;
