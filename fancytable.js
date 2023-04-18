/*!
 * jQuery fancyTable plugin v1.0.33
 * https://github.com/myspace-nu
 *
 * Copyright 2018 Johan Johansson
 * Released under the MIT license
 */
!function(i) {
    i.fn.fancyTable = function(a) {
        var o = i.extend({
            inputStyle: "",
            inputPlaceholder: "Search...",
            pagination: !1,
            paginationClass: "btn btn-light",
            paginationClassActive: "active",
            pagClosest: 3,
            perPage: 10,
            sortable: !0,
            searchable: !0,
            matchCase: !1,
            exactMatch: !1,
            localeCompare: !1,
            onInit: function() {},
            beforeUpdate: function() {},
            onUpdate: function() {},
            sortFunction: function(a, e, t, n, r) {
                return a == e && n && r ? t.rowSortOrder[i(n).data("rowid")] > t.rowSortOrder[i(r).data("rowid")] : "numeric" == t.sortAs[t.sortColumn] ? 0 < t.sortOrder ? parseFloat(a) - parseFloat(e) : parseFloat(e) - parseFloat(a) : o.localeCompare ? a.localeCompare(e) < 0 ? -t.sortOrder : 0 < a.localeCompare(e) ? t.sortOrder : 0 : a < e ? -t.sortOrder : e < a ? t.sortOrder : 0
            },
            testing: !1
        }, a)
          , l = this;
        return this.settings = o,
        this.tableUpdate = function(n) {
            if (o.beforeUpdate.call(this, n),
            n.fancyTable.matches = 0,
            i(n).find("tbody tr").each(function() {
                var a = 0
                  , e = !0
                  , t = !1;
                i(this).find("td").each(function() {
                    o.globalSearch || !n.fancyTable.searchArr[a] || l.isSearchMatch(i(this).html(), n.fancyTable.searchArr[a]) ? !o.globalSearch || n.fancyTable.search && !l.isSearchMatch(i(this).html(), n.fancyTable.search) || Array.isArray(o.globalSearchExcludeColumns) && o.globalSearchExcludeColumns.includes(a + 1) || (t = !0) : e = !1,
                    a++
                }),
                (o.globalSearch && t || !o.globalSearch && e) && (n.fancyTable.matches++,
                !o.pagination || n.fancyTable.matches > n.fancyTable.perPage * (n.fancyTable.page - 1) && n.fancyTable.matches <= n.fancyTable.perPage * n.fancyTable.page) ? i(this).show() : i(this).hide()
            }),
            n.fancyTable.pages = Math.ceil(n.fancyTable.matches / n.fancyTable.perPage),
            o.pagination) {
                var a = n.fancyTable.paginationElement ? i(n.fancyTable.paginationElement) : i(n).find(".pag");
                a.empty();
                for (var e, t = 1; t <= n.fancyTable.pages; t++)
                    (1 == t || t > n.fancyTable.page - (o.pagClosest + 1) && t < n.fancyTable.page + (o.pagClosest + 1) || t == n.fancyTable.pages) && (e = i("<a>", {
                        html: t,
                        "data-n": t,
                        style: "margin:0.2em",
                        class: o.paginationClass + " " + (t == n.fancyTable.page ? o.paginationClassActive : "")
                    }).css("cursor", "pointer").bind("click", function() {
                        n.fancyTable.page = i(this).data("n"),
                        l.tableUpdate(n)
                    }),
                    t == n.fancyTable.pages && n.fancyTable.page < n.fancyTable.pages - o.pagClosest - 1 && a.append(i("<span>...</span>")),
                    a.append(e),
                    1 == t) && n.fancyTable.page > o.pagClosest + 2 && a.append(i("<span>...</span>"))
            }
            o.onUpdate.call(this, n)
        }
        ,
        this.isSearchMatch = function(a, e) {
            if (o.matchCase || (a = a.toUpperCase(),
            e = e.toUpperCase()),
            "auto" == o.exactMatch && e.match(/^".*?"$/))
                return a == (e = e.substring(1, e.length - 1));
            var t, n;
            if ("auto" == o.exactMatch && e.replace(/\s+/g, "").match(/^[<>]=?/))
                return n = e.replace(/\s+/g, "").match(/^[<>]=?/)[0],
                t = e.replace(/\s+/g, "").substring(n.length),
                ">" == n && +t < +a || "<" == n && +a < +t || ">=" == n && +t <= +a || "<=" == n && +a <= +t;
            if ("auto" == o.exactMatch && e.replace(/\s+/g, "").match(/^.+(\.\.|-).+$/))
                return +a >= +(n = e.replace(/\s+/g, "").split(/\.\.|-/))[0] && +a <= +n[1];
            try {
                return !0 === o.exactMatch ? a == e : new RegExp(e).test(a)
            } catch {
                return !1
            }
        }
        ,
        this.reinit = function() {
            i(this).each(function() {
                i(this).find("th a").contents().unwrap(),
                i(this).find("tr.fancySearchRow").remove()
            }),
            i(this).fancyTable(this.settings)
        }
        ,
        this.tableSort = function(r) {
            var a, e;
            void 0 !== r.fancyTable.sortColumn && r.fancyTable.sortColumn < r.fancyTable.nColumns && (a = 0,
            i(r).find("thead th").each(function() {
                i(this).attr("aria-sort", a == r.fancyTable.sortColumn ? 1 == r.fancyTable.sortOrder ? "ascending" : -1 == r.fancyTable.sortOrder ? "descending" : "other" : null),
                a++
            }),
            i(r).find("thead th div.sortArrow").each(function() {
                i(this).remove()
            }),
            (e = i("<div>", {
                class: "sortArrow"
            }).css({
                margin: "0.1em",
                display: "inline-block",
                width: 0,
                height: 0,
                "border-left": "0.4em solid transparent",
                "border-right": "0.4em solid transparent"
            })).css(0 < r.fancyTable.sortOrder ? {
                "border-top": "0.4em solid #000"
            } : {
                "border-bottom": "0.4em solid #000"
            }),
            i(r).find("thead th a").eq(r.fancyTable.sortColumn).append(e),
            e = i(r).find("tbody tr").toArray().sort(function(a, e) {
                var t = i(a).find("td").eq(r.fancyTable.sortColumn)
                  , n = i(e).find("td").eq(r.fancyTable.sortColumn)
                  , t = i(t).attr("data-sortvalue") ? i(t).data("sortvalue") : t.html()
                  , n = i(n).attr("data-sortvalue") ? i(n).data("sortvalue") : n.html();
                return "case-insensitive" == r.fancyTable.sortAs[r.fancyTable.sortColumn] && (t = t.toLowerCase(),
                n = n.toLowerCase()),
                o.sortFunction.call(this, t, n, r.fancyTable, a, e)
            }),
            i(e).each(function(a) {
                r.fancyTable.rowSortOrder[i(this).data("rowid")] = a
            }),
            i(r).find("tbody").empty().append(e))
        }
        ,
        this.each(function() {
            if ("TABLE" !== i(this).prop("tagName"))
                return console.warn("fancyTable: Element is not a table."),
                !0;
            var e, t, a, n, r, s = this;
            s.fancyTable = {
                nColumns: i(s).find("td").first().parent().find("td").length,
                nRows: i(this).find("tbody tr").length,
                perPage: o.perPage,
                page: 1,
                pages: 0,
                matches: 0,
                searchArr: [],
                search: "",
                sortColumn: o.sortColumn,
                sortOrder: void 0 !== o.sortOrder && (new RegExp("desc","i").test(o.sortOrder) || -1 == o.sortOrder) ? -1 : 1,
                sortAs: [],
                paginationElement: o.paginationElement
            },
            s.fancyTable.rowSortOrder = new Array(s.fancyTable.nRows),
            0 == i(s).find("tbody").length && (a = i(s).html(),
            i(s).empty(),
            i(s).append("<tbody>").append(i(a))),
            0 == i(s).find("thead").length && i(s).prepend(i("<thead>")),
            i(s).find("tbody tr").each(function(a) {
                i(this).data("rowid", a)
            }),
            o.sortable && (e = 0,
            i(s).find("thead th").each(function() {
                s.fancyTable.sortAs.push("numeric" == i(this).data("sortas") ? "numeric" : "case-insensitive" == i(this).data("sortas") ? "case-insensitive" : null);
                var a = i(this).html()
                  , a = i("<a>", {
                    href: "#",
                    "aria-label": "Sort by " + i(this).text(),
                    html: a,
                    "data-n": e,
                    class: ""
                }).css({
                    cursor: "pointer",
                    color: "inherit",
                    "text-decoration": "none",
                    "white-space": "nowrap"
                }).bind("click", function() {
                    return s.fancyTable.sortColumn == i(this).data("n") ? s.fancyTable.sortOrder = -s.fancyTable.sortOrder : s.fancyTable.sortOrder = 1,
                    s.fancyTable.sortColumn = i(this).data("n"),
                    l.tableSort(s),
                    l.tableUpdate(s),
                    !1
                });
                i(this).empty(),
                i(this).append(a),
                e++
            })),
            o.searchable && (t = i("<tr>").addClass("fancySearchRow"),
            o.globalSearch ? (a = i("<input>", {
                "aria-label": "Search table",
                placeholder: o.inputPlaceholder,
                style: "width:100%;box-sizing:border-box;" + o.inputStyle
            }).bind("change paste keyup", function() {
                s.fancyTable.search = i(this).val(),
                s.fancyTable.page = 1,
                l.tableUpdate(s)
            }),
            n = i("<th>", {
                style: "padding:2px;"
            }).attr("colspan", s.fancyTable.nColumns),
            i(a).appendTo(i(n)),
            i(n).appendTo(i(t))) : (r = 0,
            i(s).find("td").first().parent().find("td").each(function() {
                s.fancyTable.searchArr.push("");
                var a = i("<input>", {
                    "aria-label": "Search column",
                    "data-n": r,
                    placeholder: o.inputPlaceholder,
                    style: "width:100%;box-sizing:border-box;" + o.inputStyle
                }).bind("change paste keyup", function() {
                    s.fancyTable.searchArr[i(this).data("n")] = i(this).val(),
                    s.fancyTable.page = 1,
                    l.tableUpdate(s)
                })
                  , e = i("<th>", {
                    style: "padding:2px;"
                });
                i(a).appendTo(i(e)),
                i(e).appendTo(i(t)),
                r++
            })),
            t.appendTo(i(s).find("thead"))),
            l.tableSort(s),
            o.pagination && !o.paginationElement && (i(s).find("tfoot").remove(),
            i(s).append(i("<tfoot><tr></tr></tfoot>")),
            i(s).find("tfoot tr").append(i("<td class='pag'></td>", {}).attr("colspan", s.fancyTable.nColumns))),
            l.tableUpdate(s),
            o.onInit.call(this, s)
        }),
        this
    }
}(jQuery);
