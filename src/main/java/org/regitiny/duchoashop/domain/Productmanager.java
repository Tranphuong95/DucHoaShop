package org.regitiny.duchoashop.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Productmanager.
 */
@Entity
@Table(name = "productmanager")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "productmanager")
public class Productmanager implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "input_title")
    private String inputTitle;

    @Column(name = "input_information")
    private String inputInformation;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInputTitle() {
        return inputTitle;
    }

    public Productmanager inputTitle(String inputTitle) {
        this.inputTitle = inputTitle;
        return this;
    }

    public void setInputTitle(String inputTitle) {
        this.inputTitle = inputTitle;
    }

    public String getInputInformation() {
        return inputInformation;
    }

    public Productmanager inputInformation(String inputInformation) {
        this.inputInformation = inputInformation;
        return this;
    }

    public void setInputInformation(String inputInformation) {
        this.inputInformation = inputInformation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Productmanager)) {
            return false;
        }
        return id != null && id.equals(((Productmanager) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Productmanager{" +
            "id=" + getId() +
            ", inputTitle='" + getInputTitle() + "'" +
            ", inputInformation='" + getInputInformation() + "'" +
            "}";
    }
}
