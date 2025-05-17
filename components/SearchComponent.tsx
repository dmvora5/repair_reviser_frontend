import { Search } from 'lucide-react'
import React, { FC, useEffect, useState, ChangeEvent } from 'react'
import { Input } from './ui/input'

interface SearchProps {
    searchState: (value: string) => void
}

const SearchComponent: FC<SearchProps> = ({ searchState }) => {
    const [search, setSearch] = useState<any>(null)

    useEffect(() => {
        if (search === null) return // optionally avoid empty search calls
        const timer = setTimeout(() => {
            searchState(search)
        }, 800)

        return () => clearTimeout(timer)
    }, [search])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div
            className="bg-[#0C141C] border border-[#1B2231] h-[50px] rounded-[6px] flex items-center flex-1 px-4"
            role="search"
            aria-label="Search"
        >
            <Search width={20} height={20} color="white" aria-hidden="true" />
            <Input
                className="border-none text-xl no-focus placeholder:text-[#8F9DAC] text-white font-medium text-[14px] tracking-normal leading-5 pr-0"
                placeholder="Search here what you are looking for..."
                onChange={handleChange}
                value={search}
                aria-label="Search input"
            />
        </div>
    )
}

export default SearchComponent
