export interface SnackbarData {
    message: string,
    milliseconds: number | null,
}

class _SnackbarService {
    private data: Array<SnackbarData>
    private defaultTime: number
    constructor() {
        this.defaultTime = 2000
        this.data = []
    }

    public getData(): Array<SnackbarData> {
        return this.data
    }
    public addSnackbar(snackbarData: SnackbarData) {
        if(snackbarData.milliseconds == null) {
            snackbarData.milliseconds = this.defaultTime
        }
        this.data.push(snackbarData)
    }
    public update(deltaMilliseconds: number) {
        for(let i = 0; i < this.data.length; i++) {
            this.data[i].milliseconds = (this.data[i].milliseconds as number) - deltaMilliseconds
        }
        this.data = this.data.filter((snackData)=>{
            return (snackData.milliseconds as number) > 0
        })
    }
}

export const SnackbarService = new _SnackbarService()

