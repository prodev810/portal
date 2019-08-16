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
                            "node": "https://flexmon:mjjT63e@55396525c3a47458dbff3ff819b4724cc.eu-west-1.aws.found.io:9243/",
                            // "index": "omnipay-bfc-mp*",
                            "index": "",

                        }
                    },
                    licenseKey: "Z78W-XBCA6H-0Y6O5Z-4C4P1K"
                });
                console.log( 'pivot', pivot );
            }
        }
    }
</script>

<style>

</style>


