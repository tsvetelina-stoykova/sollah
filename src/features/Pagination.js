import React, {useMemo} from 'react';
import "./Pagination.css";

const Pagination = ({pages, current, siblings=3, onClick=null}) => {

    const visible = useMemo(() => {
        const ls = [];
        const start = Math.max(1, current-siblings);
        const end = Math.min(pages, current+siblings);
        for(let i=start; i<=end; i++) ls.push(i);
        if(start > 1) {
            ls.unshift('e1');
            ls.unshift(1);
        }
        if(end < pages) {
            ls.push('e2');
            ls.push(pages);
        }
        return ls;
    }, [pages,current,siblings]);

    return (<div className="pagination">
				<button className="" onClick={ () => onClick && onClick(current - 1) } disabled={current===1}>
					Previous
				</button>

				{visible.map( (p) => ( p==='e1' || p==='e2' ?
					<button disabled key={p}>...</button> :
					<button 
						key={p} 
						onClick={() => onClick && onClick(p)} 
						className={p===current ? 'selected' : null}>
						{p}
					</button>
				))}

		
				<button onClick={() => onClick && onClick(current + 1) } disabled={current===pages}>
					Next
				</button>
    		</div>);
}

export default Pagination;