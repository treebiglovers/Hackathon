import React from 'react';

const data = [
    {id : 1, imageUrl: 'https://via.placeholder.com/150', title: 'Item 1'},
    {id : 2, imageUrl: 'https://via.placeholder.com/150', title: 'Item 2'},
    {id : 3, imageUrl: 'https://via.placeholder.com/150', title: 'Item 3'},
    {id : 4, imageUrl: 'https://via.placeholder.com/150', title: 'Item 4'},
];

interface CategoryComponentProps {
    categoryName?: string; //Optional prop
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({
    categoryName,
  }) => {
    return (
      <div>
        <h2>{categoryName || 'No Category Selected'} Component</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: '150px', height: '150px' }}
              />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default CategoryComponent;