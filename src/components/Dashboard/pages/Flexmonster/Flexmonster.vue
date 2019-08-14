<template>
    <div class="card pg-merchant p-2">
        <Spinner v-if="loading"/>
        <div id="pivotContainer">The component will appear here</div>
    </div>
</template>

<script>
import flexmonster from 'flexmonster';
import 'flexmonster/flexmonster.min.css';
    import {

    } from '@/store/types'
    import Spinner from "@/components/UIComponents/Spinner"


    export default {
        name: 'IPG',
        components: { Spinner },
        data () {
            return {
                loading: true,

            }
        },
        mounted () {
            this.loading = false;
            this.getData();
        },
        computed: {

        },
        methods: {
            getData(){
                let pivot = new Flexmonster({
                    container: "pivotContainer",
                    toolbar: true,
                    report: {
                        "dataSource": {
                            "dataSourceType": "elasticsearch",
                            /* the host for the connection */
                            // "node": "https://5396525c3a47458dbff3ff819b4724cc.eu-west-1.aws.found.io:9243",
                            "node": "https://olap.flexmonster.com:9200",
                            /* the name of Elasticsearch index to connect */
                            "index": "fm-product-sales"
                        }
                    },
                    licenseKey: "Z7N1-XCI642-6K3711-546Y3Y"
                });
                console.log( 'pivot', pivot );
            }
        }
    }
</script>

<style>

</style>


