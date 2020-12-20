<template>

    <md-card>
        <md-card-content>
            <md-table>
                <md-table-row>
                    <md-table-head v-for="c in columnDisplayNames" :key="c">{{c}}</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item,index) in items" :key="index">
                    <md-table-cell v-for="c in columnNames" :key="c">
                        {{items[index][c]}}
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </md-card-content>
        <md-card-actions>
        <md-button v-on:click="prevPage" :disabled="disabledPrev()">
            <md-icon>arrow_back_ios</md-icon>
        </md-button>
        <md-button v-on:click="nextPage" :disabled="disabledNext()">
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
      page: 0,
  }},
  props: {
      /**
       * @type Page<T>
       */
      pagesObject: {
          type: Object,
          required: true
      },
      headerTranslations: {
          type: Object,
          required: true
      }
  },
  computed: {
      columnNames() {
          if(!this.items.length) {
              return ['Nie ma nic do wyświetlenia']
          }
          let item = this.items[0]
          let columnNames = Object.keys(item)
          return columnNames
      },
      columnDisplayNames() {
          if(!this.items.length) {
              return ['Nie ma nic do wyświetlenia']
          }
          let item = this.items[0]
          let columnNames = Object.keys(item)
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
          this.items = items;
      })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

