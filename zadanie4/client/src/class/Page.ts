abstract class Page<T> {
    
    private pages: Map<number,Array<T>>
    protected perPage: number|null
    public get PerPage(): number|null { return this.perPage }
    protected countAll: number|null
    public get CountAll(): number|null { return this.countAll }
    public getLastPage(): number|null {
        if(this.perPage == null || this.countAll == null) {
            return null
        } else {
            return Math.ceil((this.countAll as number) / (this.perPage as number))
        }
    }
    
    constructor() {
        this.perPage = null
        this.countAll = null
        this.pages = new Map<number,Array<T>>();
    }

    protected abstract fetch(numberOfPage: number): Promise<Array<T>>;

    public async getPageAsync(numberOfPage: number): Promise<Array<T>> {
        if(this.hasPage(numberOfPage)) {
            return new Promise<Array<T>>((resolve,reject)=>{
                resolve(this.getPage(numberOfPage));
            })
        } else {
            return this.fetch(numberOfPage).then((value: Array<T>)=>{
                this.setPage(numberOfPage,value)
                return value
            })
        }
    }

    protected setPage(numberOfPage: number, page: Array<T>) {
        this.pages.set(numberOfPage,page)
    }
    protected getPage(numberOfPage: number): Array<T> {
        if(this.pages.has(numberOfPage)) {
            let x: Array<T> = (this.pages.get(numberOfPage)) as Array<T>
            return x
        } else {
            return [];
        }
    }
    public hasPage(numberOfPage: number): boolean {
        return this.pages.has(numberOfPage);
    }
    public clear() {
        this.pages.clear()
    }

}

abstract class PageWithExpiry<T> extends Page<T> {
    private timeOfSet: Map<number,Date>
    private expireTimeInMilliseconds: number
    public set ExpireTimeInMilliseconds(value: number) {
        if(value < 1000) value = 1000
        this.expireTimeInMilliseconds = value
    }
    public get ExpireTimeInMilliseconds(): number { return this.expireTimeInMilliseconds }
    constructor() {
        super()
        this.expireTimeInMilliseconds = 300000
        this.timeOfSet = new Map<number,Date>()
    }
    protected setPage(numberOfPage: number, page: Array<T>) {
        super.setPage(numberOfPage,page)
        this.timeOfSet.set(numberOfPage,new Date())
    }
    public hasPage(numberOfPage: number): boolean {
        let hasPage = super.hasPage(numberOfPage)
        if(hasPage) {
            let hasTimeOfSet = this.timeOfSet.has(numberOfPage)
            if(hasTimeOfSet) {
                let currentDate = new Date()
                let timeSet = this.timeOfSet.get(numberOfPage)
                let period = currentDate.getTime() - (timeSet as Date).getTime()
                return period < this.expireTimeInMilliseconds
            } else {
                return false
            }
        } else {
            return false
        }
    }

}

export { Page, PageWithExpiry }