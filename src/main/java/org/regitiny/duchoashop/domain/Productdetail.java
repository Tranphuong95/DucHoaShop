package org.regitiny.duchoashop.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Productdetail.
 */
@Entity
@Table(name = "productdetail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "productdetail")
public class Productdetail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "productshopcart")
    private String productshopcart;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductshopcart() {
        return productshopcart;
    }

    public Productdetail productshopcart(String productshopcart) {
        this.productshopcart = productshopcart;
        return this;
    }

    public void setProductshopcart(String productshopcart) {
        this.productshopcart = productshopcart;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Productdetail)) {
            return false;
        }
        return id != null && id.equals(((Productdetail) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Productdetail{" +
            "id=" + getId() +
            ", productshopcart='" + getProductshopcart() + "'" +
            "}";
    }
}
