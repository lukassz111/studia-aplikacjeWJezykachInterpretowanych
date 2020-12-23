import { PageWithExpiry } from "@/class/Page"
import { Category } from "@/model/Category"
import { ApiService, Response } from "./ApiService"

class CategoryPage extends PageWithExpiry<Category> {
    protected fetch(numberOfPage: number): Promise<Array<Category>> {
        let url = "/categories?page="+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let data: Array<any> = value.data as Array<any>
            let metadata: any = value.metadata;
            let dataCategories = data.map<Category>((data)=>{
                return {
                    id: data.id,
                }
            })
            let countAll = metadata.count_all as number
            let perPage = metadata.per_page as number
            this.perPage = perPage
            this.countAll = countAll
            this.setPage(numberOfPage,dataCategories)
            return dataCategories
        })
    }
    
}
class _CategoryService {

    private categories: CategoryPage
    public get Categories(): CategoryPage { return this.categories }
    public async getCategoryOrIfNotExistThenCreate(categoryId: string) {
        let existingCategories: Category[] = await this.Categories.fetchAll()
        let categoryIndex: number = existingCategories.findIndex((category: Category) => {
            return (category.id == categoryId)
        })
        if(categoryIndex != -1) {
            return existingCategories[categoryIndex]
        } else {
            return await this.addCategory({ id: categoryId })
        }
    }
    private async addCategory(category: Category): Promise<Category|null> {
        let url = "/categories"
        return ApiService.post(url,category).then((response: Response)=>{
            if(response.status == 200 && Object.prototype.hasOwnProperty.call(response.metadata,'success')) {
                if(response.metadata.success) {
                    this.Categories.clear()
                    return response.data
                }
            }
            return null
        })
    }
    constructor() {
        this.categories = new CategoryPage()
    }
}

const CategoryService: _CategoryService = new _CategoryService()

export { CategoryService }