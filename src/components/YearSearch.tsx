import "./Search.css";
import { startTransition, useMemo, useState } from "react";
import * as Ariakit from "@ariakit/react";
import { matchSorter } from "match-sorter";

export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    const combobox = Ariakit.useComboboxStore({
        setValue(value) {
            startTransition(() => setSearchValue(value));
        },
    });
    const matches = useMemo(() => matchSorter(Array.from({ length: 42 }, (_, index) => 1975 + index), searchValue), [searchValue]);
    return (
        <div className="mr-8">
            <label className="label">
                <Ariakit.Combobox
                    store={combobox}
                    placeholder="e.g., 1975"
                    className="combobox"
                />
            </label>
            <Ariakit.ComboboxPopover
                store={combobox}
                gutter={8}
                sameWidth
                className="popover"
            >
                {matches.length ? (
                    matches.map((value) => (
                        <Ariakit.ComboboxItem
                            key={value}
                            value={value.toString()}
                            className="combobox-item"
                        />
                    ))
                ) : (
                    <div className="no-results">No results found</div>
                )}
            </Ariakit.ComboboxPopover>
        </div>
    );
}
