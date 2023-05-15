import React from 'react';
import ReactDom from 'react-dom';
import Image from '../Image.jsx';

const imageData = {
    name: 'A1CF8BE6-1689-43FF-BEEE-9146BE76F885.jpeg',
    alt: '',
    caption: '',
    imageVariations: {
        original: {
            url: 'https://placehold.co/799x1200',
            width: 799,
            height: 1200,
            byteSize: 179638,
            mimeType: 'image/jpeg',
            aspectRatio: '4:3',
            sha1Hash: '',
        },
        aspectRatios: [
            {
                url: 'https://placehold.co/200x200',
                width: 200,
                height: 200,
                byteSize: 8470,
                mimeType: 'image/jpeg',
                aspectRatio: '4:3',
                sha1Hash: '',
            },
            {
                url: 'https://placehold.co/100x100',
                width: 100,
                height: 100,
                byteSize: 3277,
                mimeType: 'image/jpeg',
                aspectRatio: '4:3',
                sha1Hash: '',
            },
            {
                url: 'https://placehold.co/1343x1343',
                width: 1343,
                height: 1343,
                byteSize: 208392,
                mimeType: 'image/jpeg',
                aspectRatio: '4:3',
                sha1Hash: '',
            },
            {
                url: 'https://placehold.co/1110x1110',
                width: 1110,
                height: 1110,
                byteSize: 154105,
                mimeType: 'image/jpeg',
                aspectRatio: '4:3',
                sha1Hash: '',
            },
            {
                url: 'https://placehold.co/960x960',
                width: 960,
                height: 960,
                byteSize: 120574,
                mimeType: 'image/jpeg',
                aspectRatio: '4:3',
                sha1Hash: '',
            },
            {
                url: 'https://placehold.co/795x795',
                width: 795,
                height: 795,
                byteSize: 89173,
                mimeType: 'image/jpeg',
                aspectRatio: '4:3',
                sha1Hash: '',
            },
            {
                url: 'https://placehold.co/555x555',
                width: 555,
                height: 555,
                byteSize: 48634,
                mimeType: 'image/jpeg',
                aspectRatio: '4:3',
                sha1Hash: '',
            },
        ],
    },
};

const imgAlt = 'Test alt';

test('<Image /> - renders', () => {
    const div = document.createElement('div');

    ReactDom.render(
        <div className="container">
            <Image image={imageData} alt={imgAlt} />
        </div>,
        div,
    );

    expect([...div.querySelectorAll('img')]).toHaveLength(1);
    expect(div.querySelector('img').src).toBe(imageData.imageVariations.original.url);
    expect(div.querySelector('img').alt).toBe(imgAlt);
});
