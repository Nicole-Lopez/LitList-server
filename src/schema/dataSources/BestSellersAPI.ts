import { RESTDataSource } from '@apollo/datasource-rest'

export class BestSellersAPI extends RESTDataSource {
    override baseURL = 'https://api.nytimes.com/svc/books/v3/'

    async getBestSellersByList(listName: string) {
        const data = await this.get('lists.json', {
            params: {
                list: listName,
                'api-key': process.env.NYTIMES_APIKEY,
            },
        })

        return data
    }
}
