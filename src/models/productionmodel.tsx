export interface IProductModel {
    pid: string;
    code: string;
    name: string;
    active: boolean;
}


// Assuming this is in a file like ProductModel.js or within your React component file

export interface ICategoryModel {
    id: string;
    productName: string;
    categoryCode: string;
    categoryValue: string;
    categoryPath: string;
    isActive: boolean;
}
