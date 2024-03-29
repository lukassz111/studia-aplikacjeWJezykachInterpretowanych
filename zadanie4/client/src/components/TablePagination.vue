<template>
    <md-card>
        <md-card-content>
            <md-table>
                <md-table-row>
                    <md-table-head v-for="c in columnDisplayNames" :key="c">{{c}}</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item,index) in items" :key="index" v-on:click="onItemClick(index)">
                    <md-table-cell v-for="c in columnNames" :key="c">
                        {{getTransformFor(c)(items[index][c])}}
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </md-card-content>
        <md-card-actions>
        <md-button v-if="!hidePageButtons" v-on:click="prevPage" :disabled="disabledPrev()">
            <md-icon>arrow_back_ios</md-icon>
        </md-button>
        <md-button v-if="!hidePageButtons" v-on:click="nextPage" :disabled="disabledNext()">
            <md-icon>arrow_forward_ios</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
export default {
  name: 'TablePagination',
  data() { return {
      items: [],
      hidePageButtons: false,
      page: 0,
  }},
  watch: {
      rerender() {
          console.log("refresh")
      this.pagesObject.getPageAsync(this.page).then((items)=>{
        this.items = items
        this.hidePageButtons = (this.pagesObject.getLastPage() == 0) ? true : false;
      })
      }
  },
  props: {
      rerender: {
          type: Number,
          required: false,
          default: () => { return 0 }
      },
      onElementClick: {
          type: Function,
          required: false,
          default: null
      },
      /**
       * @type Page<T>
       */
      pagesObject: {
          type: Object,
          required: true
      },
      /**
       * @type Map<string, string>
       */
      headerTranslations: {
          type: Object,
          required: true
      },
      /**
       * @type string[]
       */
      hiddenColumns: {
          type: Array,
          required: true
      },
      transforms: {
          type: Object,
          required: false
      }
  },
  computed: {
      columnNames() {
          if(this.pagesObject == null) {
              return ['Nie ma nic do wyświetlenia']
          }
          else if(!this.items.length) {
              return ['Nie ma nic do wyświetlenia']
          }
          let item = this.items[0]
          let columnNamesOrginal = Object.keys(item)
          let columnNames = columnNamesOrginal.filter((columnName)=>{
              return !this.hiddenColumns.includes(columnName)
          })
          return columnNames
      },
      columnDisplayNames() {
          let columnNames = this.columnNames
          if(!columnNames.length) {
              return ['Nie ma nic do wyświetlenia']
          }
          let newColumnDisplayNames = []
          for(let i = 0; i < columnNames.length; i++) {
              if(Object.prototype.hasOwnProperty.call(this.headerTranslations,columnNames[i])) {
                  newColumnDisplayNames.push(this.headerTranslations[columnNames[i]])
              } else {
                  newColumnDisplayNames.push(columnNames[i])
              }
          }
          return newColumnDisplayNames
      }
  },
  methods: {
      onItemClick(index) {
        if(this.onElementClick != null) {
            let item = this.items[index]
            this.onElementClick(item)
        }
      },
      getTransformFor(columnName) {
          if(this.transforms != null && Object.prototype.hasOwnProperty.call(this.transforms,columnName)) {
              return this.transforms[columnName]
          } else {
              return (value) => {
                  return value
              }
          }
      },
      disabledPrev() {
          return (this.page < 1)
      },
      disabledNext() {
          let lastPage = this.pagesObject.getLastPage()
          if(isNaN(lastPage) || lastPage == null || lastPage == undefined) { return false }
          if(this.page == lastPage) 
            return false;
          return !(this.page < lastPage);
      },
      refreshPage() {
        this.pagesObject.getPageAsync(this.page).then((items)=>{
            this.items = items;
            this.hidePageButtons = (this.pagesObject.getLastPage() == 0) ? true : false;
        })
      },
      nextPage() {
          this.page += 1
          this.refreshPage()
      },
      prevPage() {
          this.page -= 1
          this.refreshPage()
      }
  },
  created() {
      this.pagesObject.getPageAsync(this.page).then((items)=>{
        this.items = items
        this.hidePageButtons = (this.pagesObject.getLastPage() == 0) ? true : false;
      })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .md-card {
        box-shadow: initial !important;
    }
</style>

