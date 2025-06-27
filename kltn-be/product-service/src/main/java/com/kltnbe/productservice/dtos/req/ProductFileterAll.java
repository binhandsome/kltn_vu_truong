package com.kltnbe.productservice.dtos.req;

public class ProductFileterAll {
    private int page = 0;
    private int size = 12;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
