import {defineStore} from 'pinia'

export const useClassStore =defineStore('classStore' , {
    state: () => ({
        classes: [
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'Lop123',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Kết thúc',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'Lopda3',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'dadada',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'On',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'dadadada',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Off',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'Lop11231223',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai C'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'bvbfgsfg',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.w-5sI6XWm3gGn7nUeBYuFwHaE8?rs=1&pid=ImgDetMainhttps://th.bing.com/th/id/OIP.w-5sI6XWm3gGn7nUeBYuFwHaE8?rs=1&pid=ImgDetMain',
                name: 'bgmjyikyukjy',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'sfdgwgshjgwej',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'abfbabafdba',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.zlRoUz7KpSdC_AxwnLpXmAHaE8?w=255&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'Lop11231223',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai C'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'bvbfgsfg',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'bgmjyikyukjy',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai A'
            },
            {
                avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
                name: 'sfdgwgshjgwej',
                teacher: 'Copp',
                member: 30,
                limitedMember: 40,
                session: '2020-2021',
                status: 'Đang hoạt động',
                type: 'Loai B'
            }
        ],
        isBusy: false
    }),
    actions : {
        addClass(classToAdd)
        {
            this.isBusy = true

            this.classes.push(classToAdd)

            this.isBusy = false
        }
    }
})