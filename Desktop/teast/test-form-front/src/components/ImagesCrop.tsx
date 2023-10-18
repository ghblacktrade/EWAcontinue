import { useState } from 'react';

const ImagesCrop = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [cropX, setCropX] = useState<number>(0)
    const [cropY, setCropY] = useState<number>(0)
    const [cropWidth, setCropWidth] = useState<number>(100)
    const [cropHeight, setCropHeight] = useState<number>(100)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target) {
                    const imageDataURL = event.target.result as string
                    setSelectedImage(imageDataURL)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageCrop = () => {
        // тут будет логика кадрирования, будь то взятая из билиотеки или еще откуда
    }

    return (
        <div>
            <h1>Вставка и кадрирование изображения</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
            />
            {selectedImage && (
                <div>
                    <img
                        src={selectedImage}
                        alt="Выбранное изображение"
                        style={{ maxWidth: '100%' }}
                    />
                    <div>
                        <label>Координата X: </label>
                        <input
                            type="number"
                            value={cropX}
                            onChange={(e) => setCropX(parseInt(e.target.value))}
                        />
                        <label>Координата Y: </label>
                        <input
                            type="number"
                            value={cropY}
                            onChange={(e) => setCropY(parseInt(e.target.value))}
                        />
                        <label>Ширина: </label>
                        <input
                            type="number"
                            value={cropWidth}
                            onChange={(e) => setCropWidth(parseInt(e.target.value))}
                        />
                        <label>Высота: </label>
                        <input
                            type="number"
                            value={cropHeight}
                            onChange={(e) => setCropHeight(parseInt(e.target.value))}
                        />
                    </div>
                    <button onClick={handleImageCrop}>Кадрировать</button>
                </div>
            )}
        </div>
    );
};

export default ImagesCrop;
