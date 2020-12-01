package org.regitiny.duchoashop.web.rest;

import org.regitiny.duchoashop.domain.Productdetail;
import org.regitiny.duchoashop.repository.ProductdetailRepository;
import org.regitiny.duchoashop.repository.search.ProductdetailSearchRepository;
import org.regitiny.duchoashop.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link org.regitiny.duchoashop.domain.Productdetail}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductdetailResource {

    private final Logger log = LoggerFactory.getLogger(ProductdetailResource.class);

    private static final String ENTITY_NAME = "productdetail";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductdetailRepository productdetailRepository;

    private final ProductdetailSearchRepository productdetailSearchRepository;

    public ProductdetailResource(ProductdetailRepository productdetailRepository, ProductdetailSearchRepository productdetailSearchRepository) {
        this.productdetailRepository = productdetailRepository;
        this.productdetailSearchRepository = productdetailSearchRepository;
    }

    /**
     * {@code POST  /productdetails} : Create a new productdetail.
     *
     * @param productdetail the productdetail to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productdetail, or with status {@code 400 (Bad Request)} if the productdetail has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/productdetails")
    public ResponseEntity<Productdetail> createProductdetail(@RequestBody Productdetail productdetail) throws URISyntaxException {
        log.debug("REST request to save Productdetail : {}", productdetail);
        if (productdetail.getId() != null) {
            throw new BadRequestAlertException("A new productdetail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Productdetail result = productdetailRepository.save(productdetail);
        productdetailSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/productdetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /productdetails} : Updates an existing productdetail.
     *
     * @param productdetail the productdetail to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productdetail,
     * or with status {@code 400 (Bad Request)} if the productdetail is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productdetail couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/productdetails")
    public ResponseEntity<Productdetail> updateProductdetail(@RequestBody Productdetail productdetail) throws URISyntaxException {
        log.debug("REST request to update Productdetail : {}", productdetail);
        if (productdetail.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Productdetail result = productdetailRepository.save(productdetail);
        productdetailSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productdetail.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /productdetails} : get all the productdetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productdetails in body.
     */
    @GetMapping("/productdetails")
    public List<Productdetail> getAllProductdetails() {
        log.debug("REST request to get all Productdetails");
        return productdetailRepository.findAll();
    }

    /**
     * {@code GET  /productdetails/:id} : get the "id" productdetail.
     *
     * @param id the id of the productdetail to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productdetail, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/productdetails/{id}")
    public ResponseEntity<Productdetail> getProductdetail(@PathVariable Long id) {
        log.debug("REST request to get Productdetail : {}", id);
        Optional<Productdetail> productdetail = productdetailRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productdetail);
    }

    /**
     * {@code DELETE  /productdetails/:id} : delete the "id" productdetail.
     *
     * @param id the id of the productdetail to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/productdetails/{id}")
    public ResponseEntity<Void> deleteProductdetail(@PathVariable Long id) {
        log.debug("REST request to delete Productdetail : {}", id);
        productdetailRepository.deleteById(id);
        productdetailSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/productdetails?query=:query} : search for the productdetail corresponding
     * to the query.
     *
     * @param query the query of the productdetail search.
     * @return the result of the search.
     */
    @GetMapping("/_search/productdetails")
    public List<Productdetail> searchProductdetails(@RequestParam String query) {
        log.debug("REST request to search Productdetails for query {}", query);
        return StreamSupport
            .stream(productdetailSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
