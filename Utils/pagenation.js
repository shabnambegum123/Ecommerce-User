let pagaMetaService = (page, limit, result, total) => {
    let pageCount = Math.ceil(total / limit);
  
    return {
      pageMeta: {
        result: result,
        page,
        pageCount,
        nextPage: page >= Math.ceil(total / limit) ? null : page + 1,
        limit: limit,
        hasNextPage: page < pageCount,
        total: total,
      },
    };
  };
  
  module.exports = {
    pagaMetaService,
  };
  