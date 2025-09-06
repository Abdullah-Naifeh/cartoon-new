'use client';
import Image from 'next/image';
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import LoadingPhoto from './LoadingPhoto';

const photos = [
  {
    image: 'https://i.imgur.com/p7UQdQ8.png',
    number: 'number-slide2',
  },
  {
    image: 'https://i.imgur.com/EubV7nc.png',
    number: 'number-slide3',
  },
  {
    image: 'https://i.imgur.com/Aghx8tZ.png',
    number: 'number-slide1',
  },
  {
    image: 'https://i.imgur.com/1Ugllxw.png',
    number: 'number-slide4',
  },
  {
    image: 'https://i.imgur.com/4A2IYpJ.png',
    number: 'number-slide5',
  },
  {
    image: 'https://i.imgur.com/W7nzzPV.png',
    number: 'number-slide6',
  },
  {
    image: 'https://i.imgur.com/OY4UoU4.jpg',
    number: 'number-slide7',
  },
  {
    image: 'https://i.imgur.com/SOUJJ0O.png',
    number: 'number-slide8',
  },
  {
    image: 'https://i.imgur.com/1eD6a06.jpg',
    number: 'number-slide9',
  },
  {
    image: 'https://i.imgur.com/HOB8BHo.jpg',
    number: 'number-slide10',
  },
  {
    image: 'https://i.imgur.com/R7og6B0.jpg',
    number: 'number-slide11',
  },
  {
    image: 'https://i.imgur.com/VUUR6NK.png',
    number: 'number-slide12',
  },
  {
    image: 'https://i.imgur.com/tebUmkF.png',
    number: 'number-slide13',
  },
];

export default function Categories() {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      drag: true, // تفعيل التمرير بالإيماءات
      slides: {
        perView: 'auto',
        spacing: 16,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider?.next();
          }, 5000); // وقت التمرير التلقائي (5 ثوانٍ)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="keen-slider size-44 sm:size-96 lg:size-[500px] clip-arc mt-8 rounded-lg shadow-md" // إضافة الظل والحواف الدائرية
      >
        {photos?.length > 0 &&
          photos?.map((item) => (
            <div
              key={item.number}
              className={`keen-slider__slide ${item.number}`}
            >
              <div className="relative h-full w-full">
                {item?.image ? (
                  <Image
                    loading="lazy"
                    src={item?.image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    alt="photo"
                    className="rounded-lg" // إضافة حواف دائرية للصور
                  />
                ) : (
                  <LoadingPhoto />
                )}
              </div>
            </div>
          ))}
      </div>

      {/* أزرار التنقل */}
      <button
        onClick={(e) => {
          e.stopPropagation() || instanceRef.current?.prev();
        }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 opacity-75"
      >
        السابق
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation() || instanceRef.current?.next();
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 opacity-75"
      >
        التالي
      </button>
    </div>
  );
}
